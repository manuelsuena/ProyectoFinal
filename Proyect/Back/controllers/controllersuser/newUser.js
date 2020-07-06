require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');

const {
  generateError,
  randomString,
  sendEmail
           } = require('../../helpers');

const { newUserSchema } = require('../../validations/uservalidations');

async function newUser(req, res, next) {
  let connection;
  try {
    await newUserSchema.validateAsync(req.body);

    connection = await getConnection();
    const { email, contrasena, nombre, apellidos, nickname} = req.body;

    const [
      existingEmail
    ] = await connection.query(`select id_usuario from usuario where email=?`, [email]);

    if (existingEmail.length) {
      throw generateError('Este email ya está registrado en la base de datos', 409);
    }

    const dbPassword = await bcrypt.hash(contrasena, 10);
    const registrationCode = randomString(40);

    const validationURL = `${process.env.PUBLIC_HOST}/controllers/controllersuser/validate?code=${registrationCode}`;

    try {
      await sendEmail({
        email: email,
        title: 'Valida tu cuenta de usuario en el portal de ideas',
        content: `Para validar tu cuenta de usuario pega esta url en tu navegador: ${validationURL}`
      });
    } catch (error) {
      console.error(error.response.body);
      throw new Error(
        'Error en el envío de mail. Inténtalo de nuevo más tarde.'
      );
    }

    await connection.query(
     `INSERT INTO usuario (nombre, email, contrasena, apellidos, nickname,fecha_creacion, last_password_update, registration_code, miembro_desde)
      VALUES(?, ?, ?, ?, ?, NOW(), NOW(), ?, NOW()) `,
      [nombre, email, dbPassword, apellidos, nickname, registrationCode]
    );

    res.send({
      status: 'ok',
      message:
        'El usuario registrado. Revisa tu email para activar la cuenta'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { newUser };
