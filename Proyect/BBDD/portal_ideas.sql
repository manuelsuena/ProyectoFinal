
-- Se creo la base de datos.
CREATE DATABASE portal_ideas;
USE portal_ideas;

-- se crearon las tablas usuario, idea, rating y comentario.

CREATE table usuario (
id_usuario int auto_increment,
nombre varchar(255),
apellidos varchar(255),
email varchar(50),
contraseña varchar(10),
nickname varchar (20),
fecha_creacion datetime,
fecha_modificacion datetime,
PRIMARY KEY (id_usuario)
);

CREATE table idea (
id_idea int auto_increment,
titulo varchar(50),
descripcion text,
categoria varchar(20),
visita int,
fecha_creacion datetime,
fecha_modificacion datetime,
id_usuario int,
constraint fk_idea_usuario FOREIGN KEY (id_usuario) references usuario(id_usuario),
primary key (id_idea)
);

CREATE table rating (
id_rating int  auto_increment,
cantidad_voto int,
puntaje float,
fecha_creacion datetime,
fecha_modificacion datetime,
id_idea int,
id_usuario int,
constraint fk_idea_rating foreign key(id_idea) references idea(id_idea),
constraint fk_usuario_rating foreign key(id_usuario) references usuario(id_usuario),
primary key (id_rating)
);

CREATE  table comentario (
id_comentario int auto_increment,
mensaje text,
fecha_creacion datetime,
fecha_modificacion datetime,
id_idea int,
id_usuario int,
constraint fk_idea_comentario foreign key(id_idea) references idea(id_idea),
constraint fk_usuario_comentario foreign key(id_usuario) references usuario(id_usuario),
primary key (id_comentario)
);

-- Se insertarion en cada tabla datos para verificar funcionamiento.

insert into usuario (nombre, apellidos, email, contraseña, nickname, fecha_creacion)
values('Jacob','Gardner Bullock','et.magna@vitaealiquet.net','KKH57EBI6N','JGBullock',now()),
('Uriah','Faulkner Myers','augue.porttitor@porttitor.edu','MOR96DTV8Z','Ufaulkner',now()),
('Vincent','Puckett Mcneil','adipiscing.lobortis@pedePraesenteu.com','BXP8EHG3FW','Mcneil',now());
select * from usuario;

insert into idea (titulo, descripcion, categoria, visita, fecha_creacion, id_usuario)
values ('Etiam bibendum fermentum metus','tincidunt, neque vitae semper egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus','alimentos','22',now(),3),
('convallis convallis dolor','egestas. Fusce aliquet magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum enim non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non','biotecnologia','1000',now(),1),
('Fusce fermentum','tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean sed pede nec ante blandit viverra.','desarrollo web','100',now(),2);
select * from idea;

insert into rating(cantidad_voto, puntaje, fecha_creacion, id_idea, id_usuario)
values('100','4',now(),1,3),
('1000','4.5',now(),2,1),
('500','3',now(),2,2);
select * from rating;

insert into comentario (mensaje,fecha_creacion,id_idea, id_usuario)
values('netus et malesuada fames ac turpis egestas. Aliquam fringilla cursus purus.',now(),1,3),
('consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu tellus eu augue porttitor interdum. Sed auctor odio a purus.',now(),3,1),
('malesuada fringilla est. Mauris eu turpis. Nulla aliquet.',now(),1,2),
 ('Nullam suscipit, est ac facilisis facilisis, magna tellus faucibus leo, in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non ante bibendum ullamcorper.',now(),3,3);
 
 select * from comentario;