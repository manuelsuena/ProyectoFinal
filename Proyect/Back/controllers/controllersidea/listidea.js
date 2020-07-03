require('dotenv').config();
const { getConnection } = require('../../db');

async function listIdea(req, res, next) {
    try {
      const connection = await getConnection();
      const { visita, reciente } = req.query;
  
      let result;
         
        if (reciente) {
          result = await connection.query(
          `	select i.id_idea, i.titulo, i.descripcion, i.categoria, i.visita, i.fecha_creacion, avg(r.puntaje) as avgRating
          from idea i
          LEFT  JOIN rating r on  i.id_idea = r.id_idea
          GROUP BY i.id_idea
          order by i.fecha_creacion DESC`,
        );

        } else if (visita) {
          result = await connection.query(
            `		select i.id_idea, i.titulo, i.descripcion, i.categoria, i.visita, i.fecha_creacion, avg(r.puntaje) as avgRating
            from idea i
        LEFT  JOIN rating r on  i.id_idea = r.id_idea
            GROUP BY i.id_idea
            order by i.visita DESC;`,
        );
       }  
         else {
        result = await connection.query(
          `	select i.id_idea, i.titulo, i.descripcion, i.categoria, i.visita, i.fecha_creacion, avg(r.puntaje) as avgRating
          from idea i
          LEFT  JOIN rating r on  i.id_idea = r.id_idea
          GROUP BY i.id_idea
          order by i.fecha_creacion ASC`
        );
      }   
  
      const [ideas] = result;
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: ideas
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = { listIdea };