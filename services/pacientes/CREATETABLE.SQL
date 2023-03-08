CREATE TABLE pacientes(
  id int auto_increment not null, 
  nome varchar(50), 
  cpf varchar(14), 
  idade int(11), 
  endereco varchar(30),
 primary key(id));