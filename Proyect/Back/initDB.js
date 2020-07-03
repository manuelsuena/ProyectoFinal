require('dotenv').config();
const bcrypt = require('bcrypt');
const faker = require('faker/locale/es');
const { random } = require('lodash');

const { getConnection } = require('./db');
const { formatDateToDB } = require('./helpers');

const args = process.argv;

const addData = args[2] === "--data";

async function main() {
  // Get reference to db
  const connection = await getConnection();

  console.log("Dropping tables");
  await connection.query("DROP TABLE IF EXISTS usuario");
  await connection.query("DROP TABLE IF EXISTS idea");
  await connection.query("DROP TABLE IF EXISTS rating");
  await connection.query("DROP TABLE IF EXISTS comentario");

  // Create table usuario
  await connection.query(`
    CREATE TABLE usuario (
      id_usuario INTEGER PRIMARY KEY AUTO_INCREMENT,
      nickname VARCHAR(25) UNIQUE NOT NULL,
      last_password_update DATETIME NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      contrasena VARCHAR(255) UNIQUE NOT NULL,
      role ENUM("normal", "admin") DEFAULT "normal" NOT NULL,
      activo BOOLEAN DEFAULT false NOT NULL,
      nombre VARCHAR(255),
      apellidos VARCHAR(255),
      avatar VARCHAR(255),
      visita INT,
      registration_code VARCHAR(255),
      fecha_creacion datetime,
      fecha_modificacion DATETIME
    )
`);

  // Create table idea
  await connection.query(`
    CREATE TABLE idea (
        id_idea int auto_increment,
        titulo varchar(50),
        descripcion text,
        categoria varchar(20),
        visita float,
        fecha_creacion datetime,
        fecha_modificacion datetime,
        id_usuario int,
        constraint fk_idea_usuario FOREIGN KEY (id_usuario) references usuario(id_usuario) on DELETE SET NULL,
        primary key (id_idea)
    )
  `);

  // Create table diary voto
  await connection.query(`
    CREATE TABLE rating (
        id_rating int  auto_increment,
        cantidad_voto int,
        puntaje float(5,1),
        fecha_creacion datetime,
        fecha_modificacion datetime,
        id_idea int,
        id_usuario int,
        constraint fk_idea_rating foreign key(id_idea) references idea(id_idea) on DELETE CASCADE,
        constraint fk_usuario_rating foreign key(id_usuario) references usuario(id_usuario) on DELETE CASCADE,
        primary key (id_rating)
    )
  `);

    // Create table diary mensaje
    await connection.query(`
    CREATE TABLE comentario (
        id_comentario int auto_increment,
        mensaje text,
        fecha_creacion datetime,
        fecha_modificacion datetime,
        id_idea int,
        id_usuario int,
        constraint fk_idea_comentario foreign key(id_idea) references idea(id_idea) on DELETE CASCADE,
        constraint fk_usuario_comentario foreign key(id_usuario) references usuario(id_usuario) on DELETE CASCADE,
        primary key (id_comentario)
    )
  `);


  // Create initial user
   const contrasena = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);

  await connection.query(`
        INSERT INTO usuario(fecha_creacion, last_password_update, email, contrasena, role, nombre,apellidos,nickname, activo, registration_code)
        VALUES(NOW(), NOW(), "suenomanuel@hotmail.com", "${contrasena}", "admin", "Manuel","Rodriguez","Mr", true)
      `);

  if (addData) {
    console.log('Adding initial data');

    const usuario = 5;

    for (let index = 0; index < usuario; index++) {
      // Create random user
      const email = faker.internet.email();
      const password = await bcrypt.hash(faker.internet.password(), 10);

      await connection.query(`
        INSERT INTO usuario (fecha_creacion, last_password_update, email, contrasena, role, nombre,apellidos,nickname, active)
        VALUES(NOW(), NOW(), "${email}", "${password}", "normal", "${faker.name.firstName()}", "${faker.name.lastName()}","${faker.name.prefijo()}",true )
      `);
    }

    const idea = 5;

    for (let index = 0; index < idea; index++) {
      const id_usuario = random(2, id_usuario + 1);

      await connection.query(`
      INSERT INTO idea ( fecha_creacion,titulo, descripcion, categoria, id_usuario) 
      VALUES ("${formatDateToDB(
        faker.date.recent()
      )}", "${faker.lorem.words()}", "${faker.lorem.paragraph()}","${faker.lorem.word()}", ${id_usuario})
    `);
    }

    const votes = 100;