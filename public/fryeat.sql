-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 18, 2023 alle 02:14
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fryeat`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `food`
--

CREATE TABLE `food` (
  `id` bigint(20) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `food`
--

INSERT INTO `food` (`id`, `image`, `name`) VALUES
(3, 'pasta.png', 'Pasta al sugo'),
(4, 'pizza.png', 'Pizza Margherita'),
(6, 'spaghetti.png', 'Spaghetti'),
(7, 'patate.png', 'Patate'),
(8, 'polpette.png', 'Polpette'),
(9, 'formaggio.png', 'Formaggio'),
(10, 'cioccolato.png', 'Cioccolata'),
(11, 'torta.png', 'Torta'),
(12, 'carne.png', 'Carne'),
(13, 'pollo.png', 'Pollo'),
(14, 'sushi.png', 'Sushi');

-- --------------------------------------------------------

--
-- Struttura della tabella `participations`
--

CREATE TABLE `participations` (
  `id` bigint(20) NOT NULL,
  `has_voted` bit(1) NOT NULL,
  `poll_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `polls`
--

CREATE TABLE `polls` (
  `id` bigint(20) NOT NULL,
  `finished` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `owner_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `polls_food`
--

CREATE TABLE `polls_food` (
  `id` bigint(20) NOT NULL,
  `food_id` bigint(20) NOT NULL,
  `poll_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `recovery_links`
--

CREATE TABLE `recovery_links` (
  `id` bigint(20) NOT NULL,
  `link` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `place` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `place`, `username`, `email`) VALUES
(13, 'Matteo Salvi', 'dCMMESGC3nD', 'Naples, Italy', 'mattesall', 'matteoosalvii@gmail.com'),
(16, 'Alberto Di Maio', 'C30E', 'Naples Italy', 'albedim', 'dimaio.albe@gmail.com'),
(17, 'Prova', 'C30EuMSZDdCDSQb', 'Naples Italy', 'prova', 'prova@gmail.com'),
(18, 'Ketty Sarnataro', 'SuGS', 'Naples, Italy', 'conci', 'kettysarnataro75@gmail.com');

-- --------------------------------------------------------

--
-- Struttura della tabella `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) NOT NULL,
  `food_id` bigint(20) NOT NULL,
  `poll_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `participations`
--
ALTER TABLE `participations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `polls_food`
--
ALTER TABLE `polls_food`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `recovery_links`
--
ALTER TABLE `recovery_links`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `food`
--
ALTER TABLE `food`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT per la tabella `participations`
--
ALTER TABLE `participations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT per la tabella `polls`
--
ALTER TABLE `polls`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT per la tabella `polls_food`
--
ALTER TABLE `polls_food`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT per la tabella `recovery_links`
--
ALTER TABLE `recovery_links`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
