CREATE TABLE medicamentos(
  id int(11) not null auto_increment, 
  valor float,
  qtd_estoque int(11),
  nome varchar(100),
  lote date,
  validade date,
  primary key(id)
);