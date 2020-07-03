require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');


async function deleteUser(req, res, next) {

  let connection;

    try {
      
      const { id } = req.params;
      connection = await getConnection();
      const [ current] = await connection.query('SELECT id_usuario FROM usuario where id_usuario=?', 
      [ id ]);

      if (!current.length) {
        throw generateError(`No existe el usuario}`, 400);
      }

      if (req.auth.role !== 'admin' ) {
        throw generateError(
        'Solo siendo administrador puede eliminar un usuario',
        401
        );
      }

    await connection.query(`DELETE FROM usuario  WHERE id_usuario=?`, [id]);
    res.send({
      status: 'ok',
      message: 'Usuario eliminado'
    });

  } catch (error) {
    next(error);

  } finally {
    if (connection) connection.release();
  }
}

module.exports = { deleteUser };