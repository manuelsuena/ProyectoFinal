require('dotenv').config();

const { getConnection } = require('../../db');

async function deleteIdea(req, res, next) {
    try {
      const { id } = req.params;
  
      const connection = await getConnection();
  
      // Delete image if exists!
      const [
        current
      ] = await connection.query('SELECT id_usuario from idea where id_idea=?', [id]);
  
      if (!current.length) {
        const error = new Error(`There is no entry with id ${id}`);
        error.httpCode = 400;
        throw error;
      }

  
      await connection.query('DELETE from idea WHERE id_idea=?', [id]);
      connection.release();
  
      res.send({
        status: 'ok',
        message: `Información eliminada correctamente`
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = {
    deleteIdea
  };