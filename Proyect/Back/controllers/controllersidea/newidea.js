require('dotenv').config();
const { getConnection } = require('../../db');
const { ideaSchema } = require('../../validations/ideasvalidations');

async function newIdea (req, res, next) {

    //Meter una nueva idea
    try {
     
      await ideaSchema.validateAsync(req.body);
  
      const { titulo, descripcion, categoria } = req.body;
  
      const connection = await getConnection();
  
      const [
        result
      ] = await connection.query(
        'INSERT INTO idea(titulo, descripcion, categoria, id_usuario, fecha_creacion) VALUES(?, ?, ?, ?, now())',
        [titulo, descripcion, categoria, req.auth.id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: {
          id_idea: result.insertId_idea,
          titulo,
          descripcion,
          categoria,
          usuario_id: req.auth.id,
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
module.exports = { newIdea };