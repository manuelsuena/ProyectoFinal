require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getMyIdea(req, res, next) {
  let connection;
  try {

    connection = await getConnection();
    const { id } = req.params;
    console.log(id);

    const [
      result
    ] = await connection.query(
       `SElECT id_usuario, id_idea, titulo, categoria, descripcion from idea 
      WHERE id_usuario =? group by id_idea`,
      [id]
    );

    if (!result.length) {
      throw generateError(
        `El usuario  no existe.`,
        404
      );
    }


/*  const payload = {
  titulo: ideaData.titulo,
   categoria: ideaData.categoria,
   descripcion: ideaData.descripcion,
   id_idea: ideaData.id_idea,
   id_usuario: ideaData.id_idea,
 }; */


    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function userIdea(req, res, next) {
  let connection;
  try {

    connection = await getConnection();
    const { id } = req.params;
    console.log(id);

    const [
      result
    ] = await connection.query(
       `select i.id_idea, i.id_usuario, u.id_usuario, u.nickname, u.fecha_creacion
       from idea i
       inner join usuario u on i.id_usuario= u.id_usuario
       where i.id_idea= ?`,
      [id]
    );

    if (!result.length) {
      throw generateError(
        `El usuario  no existe.`,
        404
      );
    }

 
 const [userData] = result;

/*  const payload = {
  titulo: ideaData.titulo,
   categoria: ideaData.categoria,
   descripcion: ideaData.descripcion,
   id_idea: ideaData.id_idea,
   id_usuario: ideaData.id_idea,
 }; */


    res.send({
      status: 'ok',
      data:userData,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { getMyIdea, userIdea };


  
  