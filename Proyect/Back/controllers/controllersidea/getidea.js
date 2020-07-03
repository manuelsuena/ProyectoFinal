require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getIdea (req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      `select id_idea, titulo, descripcion, categoria, visita
        from idea 
        WHERE id_idea= ?`,
      [id]
    );

    if (!result.length) {
      throw generateError(
        `La idea  no existe.`,
        404
      );
    }
    const [ideaData] = result;




    res.send({
      status: 'ok',
      data: ideaData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
  module.exports = { getIdea };
  
  