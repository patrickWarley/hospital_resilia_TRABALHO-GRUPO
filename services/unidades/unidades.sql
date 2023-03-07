-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Mar-2023 às 00:48
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projeto5`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `unidades`
--

CREATE TABLE `unidades` (
  `cnpj` varchar(14) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `unidades`
--

INSERT INTO `unidades` (`cnpj`, `nome`, `endereco`, `telefone`) VALUES
('111111111111', 'Taquara', 'Av. A, 63 - Rio', '11111111111'),
('22222222', 'Barra da Tijuca', 'Av. das Américas, 3585 - Barra da Tijuca, Rio de Janeiro/RJ', '2121212121'),
('33540450000126', 'Campo Grande', 'Rua Salmão, 255 - Campo Grande, Rio de Janeiro/RJ', '2121212121'),
('84512541141', 'Cidade de Deus', 'Av. Edgard Werneck, 3435 - Cidade de Deus, Rio de Janeiro/RJ', '2121212121'),
('8888888888888', 'Freguesia', 'Rua Tirol, 245 - Freguesia, Rio de Janeiro/RJ', '2121212121'),
('99999999999', 'Curicica', 'Estr. dos Bandeirantes, 2459 - Curicica, Rio de Janeiro/RJ', '2121212121');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `unidades`
--
ALTER TABLE `unidades`
  ADD PRIMARY KEY (`cnpj`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
