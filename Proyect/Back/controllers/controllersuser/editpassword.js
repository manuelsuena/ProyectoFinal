require('dotenv').config();
const bcrypt = require('bcrypt');

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { changePasswordSchema } = require('../../validations/uservalidations');

async function editPassword(req, res, next) {
  let connection;
  try {
    const { id } = req.params;

    connection = await getConnection();

    await changePasswordSchema.validateAsync(req.body);

    const { oldPassword, newPassword } = req.body;

    if (Number(id) !== req.auth.id) {
      throw generateError(
        `No tienes permisos para cambiar la contraseña del usuario.`,
        401
      );
    }

    if (oldPassword === newPassword) {
      throw generateError(
        'La nueva contraseña debe ser distinta a la anterior',
        400
      );
    }

    const [
      currentUser
    ] = await connection.query(
      'select id_usuario, contrasena from usuario where id_usuario=?',
      [id]
    );

    if (!currentUser.length) {
      throw generateError(`El usuario no existe`, 404);
    }

    const [dbUser] = currentUser;

    const passwordMatch = await bcrypt.compare(oldPassword, dbUser.contrasena);

    if (!passwordMatch) {
      throw generateError('Tu contraseña  no es correcta', 401);
    }

    const dbNewPassword = await bcrypt.hash(newPassword, 10);

   
    await connection.query(
      'update usuario set contrasena=?, last_password_update=NOW() where id_usuario=?',
      [dbNewPassword, 
      id
    ]
    );

    res.send({
      status: 'ok',
      message: 'Cambio de contraseña realizado. Ya puedes hacer login!'
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { editPassword };