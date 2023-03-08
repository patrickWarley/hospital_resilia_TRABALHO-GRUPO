CREATE TABLE consulta(
  id_consulta int not null auto_increment, 
  crm varchar(20), 
  especialidade varchar(50), 
  cpf_cliente varchar(20), 
  data varchar(20), 
  hora varchar(20), 
  motivo_procura varchar(500), 
  observacao_medico varchar(100), 
  primary key(id_consulta)); 