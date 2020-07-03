require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { mensajeSchema } = require('../../validations/ideasvalidations');



// POST - /mensaje/:id/mensaje
 async function comentarIdea(req, res, next) {
    try {
      const { id } = req.params;
  
      // Validate payload
      await mensajeSchema.validateAsync(req.body);
  
      const { mensaje } = req.body/* .text; */
    /*  const { id_usuario } = req.body; */
  
      const connection = await getConnection();
  
      // Comprobamos si existe la idea
       const [idea] = await connection.query('SELECT id_idea from idea where id_idea=?', 
      [id]
      );
  
      if (!idea.length) {
        const error = new Error('La entrada con la id específicada no existe');
        error.httpCode = 404;
        throw error;
      } 
    
      //comentario
      await connection.query(
        `
        INSERT INTO comentario(id_idea, mensaje, fecha_creacion, id_usuario) 
        VALUES(?, ?, now(), ?)`,
        [id, mensaje, req.auth.id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
       message: 'mensaje enviado exitosamente'
      });
    } catch(error) {
      next(error);
    }
  }
  
  async function getIdeaMensajes (req, res, next) {
      let connection;
      try {
    
        connection = await getConnection();
        const { id } = req.params;
        console.log(id);
    
        const [
          result
        ] = await connection.query(
          `select id_usuario, id_idea, mensaje, id_comentario from comentario where id_idea= ?`,
          [id]
        );
    
        if (!result.length) {
          throw generateError(
            `La idea  no existe.`,
            404
          );
        }
  
    
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
  /*   let connection;
    try {
      const { id } = req.params;
  
      connection = await getConnection();
  
      const [
        result
      ] = await connection.query(
        `select i.id_idea, i.id_usuario, c.id_idea, c.mensaje
        from idea i
        inner join comentario c on i.id_idea = c.id_idea
        where i.id_idea = ? group by mensaje `,
      [
          id
        ]
      );
  
      if (!result.length) {
        throw generateError(
          `La idea  no existe.`,
          404
        );
      }
      const [datos] = result;
      res.send({
        status: 'ok',
        data: datos,
      });
    } catch (error) {
      next(error);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } */
  
  async function DeleteIdeaMensaje(req, res, next) {
    try {
      const { id } = req.params;
      const connection = await getConnection();
  
      const [
        data
      ] = await connection.query('SELECT * from comentario WHERE id_comentario=?', [
        id
      ]);

      if (!data.length) {
        throw generateError(`No existe ese comentario`, 400);
      }
  /*     if (data[0].usuario_id !== req.auth.id || req.auth.role !== 'admin') {
        throw generateError('No puedes eliminar el mensaje', 400);
      } */
      await connection.query(
        'DELETE from comentario WHERE id_comentario=?',
        [id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: 'Mensaje borrado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async function userMensaje(req, res, next) {
    let connection;
    try {
  
      connection = await getConnection();
      const { id } = req.params;
      console.log(id);
  
      const [
        result
      ] = await connection.query(
        `select id_usuario, mensaje, id_comentario from comentario where id_usuario= ?`,
        [id]
      );
  
      if (!result.length) {
        throw generateError(
          `El usuario  no existe.`,
          404
        );
      }

  
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
  
  module.exports = {
    comentarIdea,
    getIdeaMensajes,
    DeleteIdeaMensaje,
    userMensaje,
  }; 