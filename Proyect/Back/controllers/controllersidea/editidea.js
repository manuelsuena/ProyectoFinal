require('dotenv').config();

const { getConnection } = require('../../db');
const { ideaSchema } = require('../../validations/ideasvalidations');

async function editIdea(req, res, next) {
    try {
      const { titulo, descripcion, categoria } = req.body;
      const { id } = req.params;
  
      await ideaSchema.validateAsync(req.body);
  
      const connection = await getConnection();
  
      const [
        current
      ] = await connection.query('SELECT id_usuario FROM idea WHERE id_idea=?', [
        id
      ]);
  
      if (!current.length) {
        const error = new Error(`no existe ese contenido`);
        error.httpCode = 404;
        throw error;
      }
  
       // chequea autorización
 /*      if (current[0].id_usuario !== req.auth.id || req.auth.role !== 'admin') {
        const error = new Error('No tienes permisos para editar esta información');
        error.httpCode = 401;
        throw error;
      } */
 
      await connection.query(
        'UPDATE idea SET titulo=?, descripcion=?, categoria=?,fecha_modificacion=NOW() WHERE id_idea=?',
        [titulo, descripcion, categoria, id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: 'Idea modificada correctamente'
      });
    } catch (error) {
      next(error);
    } 
  }
module.exports = { editIdea }; 
  