require('dotenv').config();
const jwt = require('jsonwebtoken');

const { getConnection } = require('../db');
const { generateError } = require('../helpers');

async function userIsAuthenticated(req, res, next) {
  let connection;

  try {
   // Se chequea la cabecera o headers.
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 400);
    }

    const authorizationParts = authorization.split(' ');

    let token;

    if (authorizationParts.length === 1) {
      token = authorization;
    } else if (authorizationParts[0] === 'Bearer') {
      token = authorizationParts[1];
    } else {
      throw generateError('No se puede leer el token');
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new Error('El token no es valido');
    }

    // Comprobar que la fecha de expedición del token sea mayor a la
    // fecha de última actualización de password del usuario
    const { id, iat } = decoded;

    connection = await getConnection();

    const [
      result
    ] = await connection.query(
      'SELECT role, last_password_update FROM usuario WHERE id_usuario=?',
      [id]
    );

    if (!result.length) {
      throw new Error('El usuario no existe en la base de datos');
    }

    const [user] = result;

    // comprobar que la fecha del token menor mayor que user.lastPasswordUpdate
    // Tened en cuenta que el iat del token está guardado en segundos y node trabaja en
    // milisegundos
    if (new Date((iat + 7200) * 1000) < new Date(user.last_password_update)) {
      throw new Error('El token ya no es valido, haz login para conseguir otro');
    }

    req.auth = decoded;
    next();
  } catch (error) {
    error.httpCode = 401;
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

function userIsAdmin(req, res, next) {
  if (!req.auth && req.auth.role !== 'admin') {
    const error = new Error('No tienes privilegios de administrador');
    error.httpCode = 401;
    return next(error);
  }

  next();
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin
};