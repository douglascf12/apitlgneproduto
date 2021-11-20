show tables;

CREATE DATABASE tlgneprodutos;

use tlgneprodutos;

CREATE TABLE produtos (
id int(4) PRIMARY KEY AUTO_INCREMENT,
titulo varchar(30),
descricao varchar(50),
categoria varchar(15),
preco float
);