CREATE TABLE medico (
  id int(11) NOT NULL auto_increment, 
  crm int(11) NOT NULL,
  nome varchar(50) NOT NULL,
  especialidade varchar(50) NOT NULL,
  telefone int(11) NOT NULL,
  endereco varchar(100) NOT NULL,
  PRIMARY KEY(id)
);