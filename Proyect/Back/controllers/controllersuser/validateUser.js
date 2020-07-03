require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');


async function validateUser(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { code } = req.query;

    const [
      result
    ] = await connection.query(
      'UPDATE usuario SET activo=1, registration_code=NULL WHERE registration_code=?',
      [code]
    );

    if (result.affectedRows === 0) {
      throw generateError('Validación incorrecta', 400);
    }

    res.send({
      status: 'ok',
      message: 'Usuario validado. Realiza el login para entrar a la web'
       // data: {
      //   token
      // }

    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { validateUser };