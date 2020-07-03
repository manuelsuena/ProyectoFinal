require('dotenv').config();

const { getConnection } = require('../../db');
 const { voteSchema } = require('../../validations/ideasvalidations'); 

async function voteIdea(req, res, next) {
    try {
      const { id } = req.params;
     
  
      // Validate payload
      await voteSchema.validateAsync(req.body); 
  
      const { puntaje } = req.body;
  
      const connection = await getConnection();
  
      // Comprobamos si existe la idea
      const [entry] = await connection.query('SELECT id_idea from idea where id_idea=?', [
        id
      ]);
  
      if (!entry.length) {
        const error = new Error('La entrada con la id específicada no existe');
        error.httpCode = 404;
        throw error;
      }
  
      // Comprobar si el usuario ya voto en esta idea.
 
      const [
        existingVote
      ] = await connection.query(
        'SELECT id_rating from rating where id_idea=? AND id_usuario=?',
        [id, req.auth.id]
      );
  
      if (existingVote.length) {
        const error = new Error('Este usuario ya votó a esta entrada');
        error.httpCode = 403;
        throw error;
      }
  
      //Voto
      await connection.query(
         `INSERT INTO rating (id_idea, puntaje, fecha_creacion, id_usuario) 
        VALUES(?, ?, now(), ?)`, 
        
        [id, puntaje, req.auth.id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: `Tu voto ha sido satisfactorio.`
      });
    } catch(error) {
      next(error);
    }
  }
  
  async function getIdeaVotes(req, res, next) {
    try {
      const { id } = req.params;
      const connection = await getConnection();
  
      const [
        votes
      ] = await connection.query('SELECT * from rating WHERE id_idea=?', [
        id
      ]);
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: votes
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = {
    voteIdea, 
    getIdeaVotes 
  }; 