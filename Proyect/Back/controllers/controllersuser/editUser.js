require('dotenv').config();

const { getConnection } = require('../../db');
const {
  generateError,
  processAndSavePhoto,
  deletePhoto
} = require('../../helpers');

const { editUserSchema } = require('../../validations/uservalidations');

async function editUser(req, res, next) {
  let connection;
  try {
    await editUserSchema.validateAsync(req.body);
    const { id } = req.params;
    const {
      nombre,
      apellidos,
      nickname
    } = req.body;

    connection = await getConnection();

    const [
      current
    ] = await connection.query(
      'select id_usuario, avatar, nombre, apellidos, nickname from usuario where id_usuario=?',
      [id]
    );

    if (!current.length) {
      throw generateError(`El usuario no existe`, 404);
    }

    if (
      current[0].id_usuario !== req.auth.id &&
      req.auth.role !== 'admin'
    ) {
      throw generateError(
        'No tienes permiso para editar este perfil de usuario',
        401
      );
    }

    let savedFileName;

    if (req.files && req.files.avatar) {
      try {
        savedFileName = await processAndSavePhoto(req.files.avatar);

        if (current && current.avatar) {
          await deletePhoto(current.avatar);
        }
      } catch (error) {
        throw generateError('No se pudo procesar el cambio de imagen.', 400);
      }
    } else {
      savedFileName = current.avatar;
    }

    await connection.query(
        'update usuario set nombre =?, apellidos=?, nickname=?, avatar=? where id_usuario=?',
        [
          nombre,
          apellidos,
          nickname,
          savedFileName,
          id
        ]
      );
      res.send({
        status: 'ok',
        message: `Usuario actualizado correctamente`
      });
    } catch (error) {
      next(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

module.exports = { editUser };