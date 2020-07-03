const joi = require('@hapi/joi');
const { generateError } = require('../helpers');

const ideaSchema = joi.object().keys({
    titulo: joi.string()
    .min(2)
      .max(50)
      .required()
      .error(
        generateError(
          'El campo título es obligatorio y no puede tener más de 50 caracteres',
          400
        )
      ),
    descripcion: joi.string()
      .min(2)
      .max(500)
      .required()
      .error(
        generateError(
          'El campo descripción es obligatorio y no puede tener más de 500 caracteres',
          400
        )
      ),
      categoria: joi.string()
      .min(2)
      .max(20)
      .required()
      .error(
        generateError(
          'El campo categoria es obligatorio y no puede tener más de 20 caracteres',
          400
        )
      )
  });
  
  const searchSchema = joi.string()
  .min(2)
  .required()
  .error(
    generateError(
      'El campo de búsqueda debe de contener más de 2 caracteres',
      400
    )
  );

  const voteSchema = joi.object().keys({
    puntaje: joi.number()
      .min(1)
      .max(5)
      .required() 
      .error(
        generateError(
          'El campo voto debe existir y ser un número entre 1 y 5',
          400
        )
      )
  }); 


  const mensajeSchema = joi.object().keys({
    mensaje: joi.string()
      .min(1)
      .max(255)
      .required()
      .error(
        generateError(
          'El campo mensaje debe contener entre 1 y 255  caracteres',
          400
        )
      )
  });


  module.exports = {
    ideaSchema,
    searchSchema,
    voteSchema,
    mensajeSchema
  };