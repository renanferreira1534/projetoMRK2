create database mrk;
use mrk;

create table cliente(
id_cliente int auto_increment primary key,
nome varchar(50) not null,
usuario varchar(15) not null,
email varchar(50) not null,
senha varchar (10)not null
);

create table compra(
id_compra int auto_increment primary key,
id_produto int ,
id_cliente int,
cep varchar(10) not null,
endereco varchar(50) not null,
cidade varchar(30) not null,
numero varchar(5) not null,
ponto_referencia varchar(30),
pagamento int(1),
total_pagar decimal(10,2),
cpf varchar(14) not null,
telefone varchar(20) not null
);



CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    categoria VARCHAR(50),
    tamanho VARCHAR(10),
    genero VARCHAR(20),
    preco DECIMAL(10,2),
    estoque INT,
    descricao TEXT,
    imagem VARCHAR(255),
    foto1 VARCHAR(255),
    foto2 VARCHAR(255),
    foto3 VARCHAR(255),
    foto4 VARCHAR(255),
    data_cadastro TIMESTAMP
);

create table pagamento (
id_comprar int auto_increment primary key,
data_pagamento DATETIME,
formaPG varchar(1) not null,
valorPG decimal(10,2),
numeroCard varchar(19) not null,
nomeCard varchar(200)not null,
validadeCard varchar(7) not null,
cvvCard varchar (3) not null,
pixPG varchar(200)not null
);






alter table compra
add constraint fk_cliente_pk_cliente
foreign key compra(id_cliente)
references cliente(id_cliente);

alter table compra
add constraint fk_produto_pk_produto
foreign key compra(id_produto)
references produto(id_produto);
