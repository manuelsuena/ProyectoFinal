const joi = require('@hapi/joi');
 const { generateError } = require('../helpers'); 

 const contrasena = joi.string()
  .min(6)
  .max(10)
  .required()
  .error(new Error('La contraseña debe tener ente 5 y 10 caracteres'));

  const email= joi.string()
  .email()
  .required()
  .error(generateError('email no valido'));

  const nombre = joi.string()
  .min(3)
  .max(50)
  .required()
  .error(new Error('El nombre tiene que tener entre 3 y 50 caracteres'));


  const apellidos = joi.string()
  .min(4)
  .max(50)
  .required()
  .error(new Error('Los apellidos tienen que tener entre 3 y 50 caracteres'));

  const nickname = joi.string()
  .min(2)
  .max(20)
  .required()
  .error(new Error('El nickname tiene que tener entre 0 y 20 caracteres'));


  const newUserSchema = joi.object().keys({
    email: email,
    contrasena: contrasena,
    nombre: nombre,
    apellidos: apellidos,
    nickname: nickname
  });

  const editUserSchema = joi.object().keys({
    nombre: nombre,
    apellidos: apellidos,
    nickname: nickname
  });

  const changePasswordSchema = joi.object().keys({
    oldPassword: contrasena,
    newPassword: contrasena,
    newPasswordRepeat: joi.any()
      .valid(joi.ref('newPassword'))
      .error(generateError('Las passwords debe ser iguales', 400))
  });
  
  const loginSchema = joi.object().keys({ email: email, contrasena: contrasena });
  
  module.exports = {
      newUserSchema,
      editUserSchema,
      changePasswordSchema,
      loginSchema,
  };