-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 09, 2023 at 12:45 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_resilia`
--

-- --------------------------------------------------------

--
-- Table structure for table `consulta`
--

CREATE TABLE `consulta` (
  `id_consulta` int(11) NOT NULL,
  `crm` varchar(20) DEFAULT NULL,
  `especialidade` varchar(50) DEFAULT NULL,
  `cpf_cliente` varchar(20) DEFAULT NULL,
  `data` varchar(20) DEFAULT NULL,
  `hora` varchar(20) DEFAULT NULL,
  `motivo_procura` varchar(500) DEFAULT NULL,
  `observacao_medico` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consulta`
--

INSERT INTO `consulta` (`id_consulta`, `crm`, `especialidade`, `cpf_cliente`, `data`, `hora`, `motivo_procura`, `observacao_medico`) VALUES
(1, '30355249978', 'Otorrino', '1231', '1992-12-31', '00:32', 'teste', 'teste');

-- --------------------------------------------------------

--
-- Table structure for table `exames`
--

CREATE TABLE `exames` (
  `id` int(11) NOT NULL,
  `nome_paciente` varchar(100) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `crm` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exames`
--

INSERT INTO `exames` (`id`, `nome_paciente`, `cpf`, `descricao`, `crm`) VALUES
(2, 'jorge', '1818181818', 'lalalal', '23827387123');

-- --------------------------------------------------------

--
-- Table structure for table `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id` int(11) NOT NULL,
  `valor` float DEFAULT NULL,
  `qtd_estoque` int(11) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `lote` date DEFAULT NULL,
  `validade` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `valor`, `qtd_estoque`, `nome`, `lote`, `validade`) VALUES
(3, 985552, 115, 'Testarodin - 500ml', '2023-03-24', '2023-03-04'),
(5, 85, 65, 'Lorazepam', '2023-03-10', '2023-03-16');

-- --------------------------------------------------------

--
-- Table structure for table `medico`
--

CREATE TABLE `medico` (
  `id` int(11) NOT NULL,
  `crm` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `especialidade` varchar(50) NOT NULL,
  `telefone` int(11) NOT NULL,
  `endereco` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medico`
--

INSERT INTO `medico` (`id`, `crm`, `nome`, `especialidade`, `telefone`, `endereco`) VALUES
(1, 12738, 'Marina da silva', 'Otorrino', 21987992, 'Rua fraciscona da silva, 57'),
(2, 122, 'Marcelo augusto', 'Otorrino', 2198889, 'Rua fraciscona da silva, 57'),
(3, 1223, 'Pedro marcus aurelio', 'Otorrino', 123332, 'Rua testando');

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `idade` int(11) DEFAULT NULL,
  `endereco` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`id`, `nome`, `cpf`, `idade`, `endereco`) VALUES
(1, 'patrick', '14126313788', 30, 'Rua fraciscona da silva, 57'),
(2, 'Jose', '14126313588', 52, 'Rua fraciscona da silva, 57'),
(4, 'Soraia Nepomuceno Brum', '50534486126', 30, 'Quadra 48'),
(5, 'Perolla Grilo Bernardes', '39519276157', 50, 'Avenida Decolores'),
(6, 'Marina Sá Paes', '07275824299', 89, 'Otoniel de Sá Paes, 60'),
(7, 'Rozangela Grilo Lopes', '47368652374', 46, 'Avenida A,91');

-- --------------------------------------------------------

--
-- Table structure for table `unidades`
--

CREATE TABLE `unidades` (
  `cnpj` varchar(14) NOT NULL,
  `nome` varchar(20) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unidades`
--

INSERT INTO `unidades` (`cnpj`, `nome`, `endereco`, `telefone`) VALUES
('155551515', 'MADUREIRA', 'MADUREIRA', '58251545454');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id_consulta`);

--
-- Indexes for table `exames`
--
ALTER TABLE `exames`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `exames`
--
ALTER TABLE `exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `medico`
--
ALTER TABLE `medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
