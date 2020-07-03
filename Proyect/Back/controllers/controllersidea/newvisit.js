require('dotenv').config();
const { getConnection } = require('../../db');


async function visitNew (req, res, next) {

    //Meter una nueva visita
    try {
    
  
      const {id } = req.params
  
      const connection = await getConnection();
    const [ showVisit] = await connection.query(
          'SELECT visita FROM idea WHERE id_idea=?',
          [id]
        );
        const nuevaVisita = showVisit[0].visita + 1;
        await connection.query(
        'UPDATE idea SET visita = ? where id_idea = ?',
  
        [nuevaVisita,  id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: 'Nueva visita'
      });
    } catch (error) {
      next(error);
    }
  }
  
module.exports = { visitNew };