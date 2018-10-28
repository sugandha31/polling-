-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 08, 2018 at 07:08 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pollingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `live_poll`
--

CREATE TABLE `live_poll` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `poll` varchar(255) NOT NULL,
  `pos_count` int(11) NOT NULL,
  `neg_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `live_poll`
--

INSERT INTO `live_poll` (`id`, `user_id`, `poll`, `pos_count`, `neg_count`) VALUES
(1, '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 'Coffee Tonight?', 30, 9),
(2, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 'Do You Like Watching FRIENDS?', 38, 5);

-- --------------------------------------------------------

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `category_id` int(10) NOT NULL,
  `poll` varchar(255) NOT NULL,
  `is_anonymous` varchar(10) NOT NULL,
  `isActive` varchar(10) NOT NULL DEFAULT 'false',
  `CreateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `polls`
--

INSERT INTO `polls` (`id`, `user_id`, `category_id`, `poll`, `is_anonymous`, `isActive`, `CreateTime`) VALUES
(1, '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 2, 'What is the right age to do vote?', 'true', 'false', '2018-08-03 19:11:20'),
(4, '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 2, 'Hello a dummy test', 'true', 'true', '2018-08-04 11:31:50'),
(5, '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 1, 'how is your science?', 'false', 'false', '2018-08-03 19:31:44'),
(6, '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 1, 'how is your science??', 'false', 'false', '2018-08-03 19:32:30'),
(7, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush?', 'false', 'false', '2018-08-03 19:39:52'),
(8, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush??', 'false', 'false', '2018-08-03 19:52:18'),
(9, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush???', 'false', 'false', '2018-08-03 19:53:09'),
(10, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush????', 'false', 'false', '2018-08-03 19:56:41'),
(11, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush?????', 'false', 'false', '2018-08-03 19:58:48'),
(12, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush??????', 'false', 'false', '2018-08-03 20:00:10'),
(13, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush???????', 'false', 'false', '2018-08-03 20:01:05'),
(14, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush????????', 'false', 'false', '2018-08-03 20:01:51'),
(15, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 2, 'Do you know how to brush?????????', 'false', 'false', '2018-08-03 20:03:44'),
(16, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 1, 'Do you know how to brush??????????', 'true', 'false', '2018-08-03 20:05:19'),
(17, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 1, 'Do you know how to brush???????????', 'true', 'false', '2018-08-03 20:10:46'),
(18, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 1, 'Do you know how to brush????????????', 'true', 'false', '2018-08-03 20:19:46'),
(19, '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 1, 'Do you know how to brush?????????????', 'true', 'false', '2018-08-03 20:26:41');

-- --------------------------------------------------------

--
-- Table structure for table `poll_category`
--

CREATE TABLE `poll_category` (
  `id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poll_category`
--

INSERT INTO `poll_category` (`id`, `category`) VALUES
(1, 'Science'),
(2, 'Drama'),
(3, 'Fiction');

-- --------------------------------------------------------

--
-- Table structure for table `poll_option`
--

CREATE TABLE `poll_option` (
  `id` int(11) NOT NULL,
  `question_id` int(10) NOT NULL,
  `option_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `poll_option`
--

INSERT INTO `poll_option` (`id`, `question_id`, `option_value`) VALUES
(1, 1, 'yes'),
(2, 1, 'no'),
(6, 15, 'undefined'),
(7, 15, 'undefined'),
(8, 16, 'undefined'),
(9, 16, 'undefined'),
(10, 17, 'undefined'),
(11, 17, 'undefined'),
(12, 18, 'yes'),
(13, 18, 'no'),
(14, 19, 'yes'),
(15, 19, 'no'),
(16, 20, 'yes'),
(17, 20, 'no');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `session` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_id`, `email`, `password`, `session`) VALUES
(1, 'ankit', '57f9a98f94708008965dca7bd7e43cb359ac4eeaab86c83a4044', 'ankit@gmail.com', '57f9a98f94', 'false'),
(2, 'sugandha', '45e2a5878e548f04b753cb34dde77ff412a00beaee8682755a45b0f7c58a9cf8', 'sugandha@gmail.com', '57f9a98f94', 'true'),
(3, 'chunmun', '55ffb7888d4589259059c73cd8a532f810e90bafeec382324145b9fbde80', 'chunmun@gmail.com', '57f9a98f94', 'true'),
(4, 'anirudh', '57f9ab9495548f259059c73cd8a532f810e90bafeec382304759a5e3cf86', 'anirudh@gmail.com', '57f9a98f94', 'true'),
(5, 'karishma', '5df6b08f93588a04b753cb34dde77ff412a00beaee8682754251a5ffd88699f8', 'karishma@gmail.com', '5ef2b089d1', 'true');

-- --------------------------------------------------------

--
-- Table structure for table `user_selected_category`
--

CREATE TABLE `user_selected_category` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `live_poll`
--
ALTER TABLE `live_poll`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_category`
--
ALTER TABLE `poll_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `poll_option`
--
ALTER TABLE `poll_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_selected_category`
--
ALTER TABLE `user_selected_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `live_poll`
--
ALTER TABLE `live_poll`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `poll_category`
--
ALTER TABLE `poll_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `poll_option`
--
ALTER TABLE `poll_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user_selected_category`
--
ALTER TABLE `user_selected_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
