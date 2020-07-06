require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getUser(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      `select id_usuario, nombre, apellidos, nickname, email, miembro_desde from usuario where id_usuario=?`,
      [id]
    );

    if (!result.length) {
      throw generateError(
        `El usuario  no existe.`,
        404
      );
    }

    const [userData] = result;

    const payload = {
    nombre: userData.nombre,
    role: userData.role,
    apellidos: userData.apellidos,
    nickname: userData.nickname,
    email: userData.email,
    miembro_desde: userData.miembro_desde,
    };


    if (userData.id_usuario === req.auth.id || req.auth.role === 'admin') {
      payload.usernombre= userData.usernombre;
      payload.role = userData.role;

    } else {
      throw generateError('No tienes permiso para ver la información del usuario', 401);
    }
    res.send({
      status: 'ok',
      data: payload
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { getUser };