-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u1build0.15.04.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2015 at 08:15 PM
-- Server version: 5.6.27-0ubuntu0.15.04.1
-- PHP Version: 5.6.4-4ubuntu6.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mapsnew`
--

-- --------------------------------------------------------

--
-- Table structure for table `cost`
--

CREATE TABLE IF NOT EXISTS `cost` (
`ID` int(11) NOT NULL,
  `place1` int(11) NOT NULL,
  `place2` int(11) NOT NULL,
  `vehicleType` int(11) NOT NULL,
  `cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
`ID` int(11) NOT NULL,
  `data` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE IF NOT EXISTS `location` (
`ID` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `latitude` float(13,10) NOT NULL,
  `longitude` float(13,10) NOT NULL,
  `district` varchar(20) NOT NULL,
  `isStop` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`ID`, `name`, `latitude`, `longitude`, `district`, `isStop`) VALUES
(1, 'sunakothi', 27.6317558289, 85.3175048828, '', 0),
(2, 'Dholahiti', 27.6398925781, 85.3181915283, '', 0),
(3, 'Mithra Tole', 27.6451377869, 85.3193969727, '', 0),
(4, 'Chapagaun Dobato', 27.6574554443, 85.3224868774, '', 0),
(5, 'Talchikhel', 27.6591472626, 85.3210296631, '', 0),
(6, 'Mahalaxmisthan', 27.6614074707, 85.3182144165, '', 0),
(7, 'Buddhi Bikas Ground', 27.6645431519, 85.3202972412, '', 0),
(8, 'Budduth Pardikarn', 27.6660785675, 85.3220825195, '', 0),
(9, 'Lagankhel', 27.6669902802, 85.3225326538, '', 0),
(10, 'Patan Hospital', 27.6683349609, 85.3216705322, '', 0),
(11, 'Mahayan Petrol Pump', 27.6699085236, 85.3216781616, '', 0),
(12, 'Kumaripati', 27.6706180573, 85.3204498291, '', 0),
(13, 'Taphalho Road', 27.6718368530, 85.3173904419, '', 0),
(14, 'Manbhawan', 27.6720561981, 85.3159637451, '', 0),
(15, 'Standard Chartered Bank', 27.6723823547, 85.3144683838, '', 0),
(16, 'Jawalakhel', 27.6730575562, 85.3136215210, '', 0),
(17, 'Pulchowk Damkal', 27.6756057739, 85.3155517578, '', 0),
(18, 'Durbar Tole ST.', 27.6791057587, 85.3167037964, '', 0),
(19, 'Krishna Galli', 27.6804370880, 85.3172836304, '', 0),
(20, 'Harihar Bhawan', 27.6810512543, 85.3174743652, '', 0),
(21, 'Maitri Marg', 27.6818962097, 85.3178634644, '', 0),
(22, 'Nabil Bank', 27.6828918457, 85.3185348511, '', 0),
(23, 'Saheed Shukra Park', 27.6831932068, 85.3186798096, '', 0),
(24, 'Patandhoka Road', 27.6836013794, 85.3187637329, '', 0),
(25, 'Kupondole', 27.6845817566, 85.3186416626, '', 0),
(26, 'Jwagal Chowk', 27.6854019165, 85.3181991577, '', 0),
(27, 'Kupondole Bus Stop', 27.6875743866, 85.3167419434, '', 0),
(28, 'Teku Bagmati Bridge', 27.6887264252, 85.3160629272, '', 0),
(29, 'Thapathali', 27.6911849976, 85.3176879883, '', 0),
(30, 'Maitighar', 27.6945171356, 85.3197631836, '', 0),
(31, 'Tanka Prasad Ghumti Sadak', 27.6951541901, 85.3207931519, '', 0),
(32, 'Singha Durbar', 27.6974430084, 85.3212814331, '', 0),
(33, 'Singha Durbar Main Gate', 27.6984424591, 85.3214874268, '', 0),
(34, 'Bhadrakali Petrol Pump', 27.6989212036, 85.3169021606, '', 0),
(35, 'Bhadrakali Temple', 27.6993808746, 85.3164215088, '', 0),
(36, 'Sahid Gate', 27.6996498108, 85.3148727417, '', 0),
(37, 'Sundhara', 27.6999816895, 85.3134841919, '', 0),
(38, 'NAC (Sundhara BUs Stop)', 27.7024822235, 85.3136291504, '', 0),
(39, 'MahanKaal Temple', 27.7039756775, 85.3137588501, '', 0),
(40, 'Bir Hospital', 27.7057113647, 85.3142013550, '', 0),
(41, 'Ratna Park', 27.7069568634, 85.3143386841, '', 0),
(42, '_Jamal', 27.7086658478, 85.3145675659, '', 0),
(43, 'Jamal ', 27.7088394165, 85.3153152466, '', 0),
(44, '_durbarmarg', 27.7092933655, 85.3170928955, '', 0),
(45, 'Kamaladi Road', 27.7080535889, 85.3168182373, '', 0),
(46, 'Bagbazzar', 27.7062053680, 85.3163681030, '', 0),
(47, 'Purano Bus Park', 27.7040119171, 85.3164596558, '', 0),
(48, 'Tudikhel', 27.7023754120, 85.3165740967, '', 0),
(49, 'Godawari', 27.5943374634, 85.3780822754, '', 0),
(50, 'Toukhel', 27.6114330292, 85.3575668335, '', 0),
(51, 'Bandeguon', 27.6177539825, 85.3527374268, '', 0),
(52, 'Thaiba', 27.6247310638, 85.3480377197, '', 0),
(53, 'Harisiddhi', 27.6340751648, 85.3432083130, '', 0),
(55, 'Dhalko Mandir', 27.6376876831, 85.3405151367, '', 0),
(56, 'Nepal Cancer Hospital and Rese', 27.6435604095, 85.3378829956, '', 0),
(57, 'Hattiban', 27.6480007172, 85.3356781006, '', 0),
(58, 'Little Angels', 27.6504707336, 85.3317413330, '', 0),
(59, 'Dhapakhel Dobato Bus Stop', 27.6571006775, 85.3262329102, '', 0),
(60, 'Satadobato', 27.6588172913, 85.3246154785, '', 0),
(61, '_amit', 27.6596927643, 85.3240203857, '', 0),
(63, 'Patan Industrial Estate', 27.6624774933, 85.3238754272, '', 0),
(64, 'Shakti Devi Petrol Pump', 27.6644039154, 85.3239822388, '', 0),
(65, 'Kharibot', 27.6464214325, 85.3368225098, '', 0),
(69, 'Nag Daha Bus Stop', 27.6280117035, 85.3278884888, '', 0),
(78, 'Sana Gaun', 27.6497573853, 85.3589019775, '', 0),
(79, 'Kamal Pokhari, Lalitpur', 27.6564865112, 85.3485794067, '', 0),
(80, 'sadsaddas', 27.6854286194, 85.3244552612, '', 0),
(81, 'Khari Bot', 27.6591281891, 85.3445663452, '', 0),
(82, 'Krishna Mandir', 27.6617507935, 85.3426132202, '', 0),
(83, 'Pipal Bot', 27.6626815796, 85.3404464722, '', 0),
(84, 'Gwarko', 27.6667480469, 85.3322296143, '', 0),
(85, 'Tyagal Road', 27.6687583923, 85.3294296265, '', 0),
(86, 'Sundhara, Lalitpur', 27.6696510315, 85.3281555176, '', 0),
(87, 'Yangubahal Yalmul Chalchhen Ga', 27.6701889038, 85.3275070190, '', 0),
(88, 'Hakha-Chusika nani galli', 27.6715240479, 85.3259506226, '', 0),
(89, 'Mangal Bazar', 27.6726398468, 85.3249206543, '', 0),
(90, 'Kwalakhu Road', 27.6734428406, 85.3238754272, '', 0),
(91, 'Shreebahal Road', 27.6750774384, 85.3194656372, '', 0),
(92, 'Gabahal', 27.6756381989, 85.3186569214, '', 0),
(93, 'Pulchowk', 27.6771297455, 85.3162918091, '', 0),
(94, 'Tripureshwor', 27.6937313080, 85.3141250610, '', 0),
(95, 'Gems', 27.6440887451, 85.3265075684, '', 0),
(96, 'Dhapakhel Dobato Bus Stop', 27.6570663452, 85.3262100220, '', 0),
(97, 'Sarashoti kunda, Lele', 27.5680522919, 85.3411407471, '', 0),
(98, 'Lele', 27.5722751617, 85.3291244507, '', 0),
(99, 'Tikabhairab', 27.5756988525, 85.3132781982, '', 0),
(100, 'Bageshwori Temple, Tikabhairab', 27.5875473022, 85.3215637207, '', 0),
(101, 'Chapagaun Bus Stop', 27.5875473022, 85.3215637207, '', 0),
(102, 'Thecho', 27.6124782562, 85.3199386597, '', 0),
(103, 'Simako', 27.6351966858, 85.3186111450, '', 0),
(104, 'Dholahiti', 27.6397590637, 85.3180999756, '', 0),
(110, 'Pragati Chowk', 27.6465549469, 85.3198242188, '', 0),
(111, 'Janani Marga', 27.6489219666, 85.3203735352, '', 0),
(112, 'Loktantrik Chowk', 27.6499958038, 85.3209686279, '', 0),
(113, 'Ullens School', 27.6506786346, 85.3214721680, '', 0),
(114, 'Bungmati', 27.6282386780, 85.3035888672, '', 0),
(115, '_bungmati', 27.6315841675, 85.3058013916, '', 0),
(116, '_khokana', 27.6402111053, 85.3049621582, '', 0),
(117, 'Gokul Awas Road', 27.6462039948, 85.3048782349, '', 0),
(119, 'Awash Marga', 27.6490440369, 85.3052062988, '', 0),
(120, 'Bhainsepati', 27.6521816254, 85.3051223755, '', 0),
(121, 'Nakhkhu', 27.6638221741, 85.3062820435, '', 0),
(122, '_nakhuhu', 27.6635589600, 85.3064117432, '', 0),
(123, 'Ekantakuna Chowk', 27.6666183472, 85.3082656860, '', 0),
(124, '_jawalakhel handicraft', 27.6678352356, 85.3090057373, '', 0),
(125, '_Pipal Bot Ekantakuna', 27.6695461273, 85.3102493286, '', 0),
(126, '_Jawlakhel football ground', 27.6706790924, 85.3117141724, '', 0),
(127, 'Lubhu', 27.6428203583, 85.3733367920, '', 0),
(128, 'Shree MAhalaxmi Temple, Lubhu', 27.6436748505, 85.3722534180, '', 0),
(129, 'Kwe Lachhi', 27.6440353394, 85.3714981079, '', 0),
(130, '_lubhu', 27.6467819214, 85.3658981323, '', 0),
(131, 'B &amp; B', 27.6643638611, 85.3301391602, '', 0),
(132, 'Bodhigram Bus Stop', 27.6620597839, 85.3282775879, '', 0),
(133, 'Satadobato Swimming Pool ', 27.6608200073, 85.3273391724, '', 0),
(134, 'Khari ko Bot', 27.6702175140, 85.3380737305, '', 0),
(135, 'Balkumari', 27.6715373993, 85.3403778076, '', 0),
(136, 'Amarabati Marga', 27.6738281250, 85.3425521851, '', 0),
(137, 'Koteshwor', 27.6787967682, 85.3495712280, '', 0),
(138, '_tinkune', 27.6836700439, 85.3491210938, '', 0),
(139, 'Tinkune-1', 27.6870441437, 85.3502960205, '', 0),
(140, 'Panchashil', 27.6898689270, 85.3520050049, '', 0),
(141, 'Shakti Vinayak Marg', 27.6912479401, 85.3528137207, '', 0),
(142, 'Sinamangal', 27.6952991486, 85.3550186157, '', 0),
(143, 'Omnagar Marg', 27.6962776184, 85.3550872803, '', 0),
(144, 'Airport', 27.7006225586, 85.3537292480, '', 0),
(145, 'Yeti airlines, Tilganga', 27.7062034607, 85.3506774902, '', 0),
(146, 'Bagmati Pool, Gaushala', 27.7059688568, 85.3488540649, '', 0),
(147, 'Gaushala', 27.7075691223, 85.3439254761, '', 0),
(148, 'Bajrabarahi Temple, Chapagaun', 27.6064128876, 85.3246154785, '', 0),
(149, 'Nakhipot', 27.6515064240, 85.3176574707, '', 0),
(150, 'Milan chowk', 27.6527976990, 85.3170166016, '', 0),
(151, 'Umamaheshwor Temple', 27.6570129395, 85.3176040649, '', 0),
(152, 'Bishal Chowk', 27.6543197632, 85.3194351196, '', 0),
(156, '_nakhipot', 27.6539287567, 85.3216400146, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `popular_place`
--

CREATE TABLE IF NOT EXISTS `popular_place` (
`ID` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `latitude` float(13,10) NOT NULL,
  `longitude` float(13,10) NOT NULL,
  `category` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `roadway`
--

CREATE TABLE IF NOT EXISTS `roadway` (
`ID` int(11) NOT NULL,
  `point1` int(11) NOT NULL,
  `point2` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roadway`
--

INSERT INTO `roadway` (`ID`, `point1`, `point2`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(121, 4, 61),
(4, 5, 4),
(5, 6, 5),
(6, 7, 6),
(7, 7, 8),
(8, 8, 9),
(9, 9, 10),
(10, 10, 11),
(11, 11, 12),
(12, 13, 12),
(13, 14, 13),
(14, 15, 14),
(15, 16, 15),
(16, 17, 16),
(17, 18, 93),
(18, 19, 18),
(19, 20, 19),
(20, 21, 20),
(21, 22, 21),
(22, 23, 22),
(23, 24, 23),
(24, 25, 24),
(25, 26, 25),
(26, 27, 26),
(27, 28, 27),
(28, 29, 28),
(29, 30, 29),
(30, 31, 30),
(31, 32, 31),
(32, 33, 32),
(33, 34, 33),
(50, 35, 33),
(34, 35, 34),
(35, 36, 35),
(36, 37, 36),
(37, 38, 37),
(38, 39, 38),
(39, 40, 39),
(40, 41, 40),
(41, 42, 41),
(42, 43, 42),
(43, 44, 43),
(44, 45, 44),
(46, 46, 41),
(45, 46, 45),
(47, 47, 46),
(49, 48, 35),
(48, 48, 47),
(51, 50, 49),
(52, 51, 50),
(53, 52, 51),
(54, 53, 52),
(56, 55, 53),
(57, 56, 55),
(58, 57, 65),
(59, 58, 57),
(60, 59, 58),
(62, 60, 4),
(61, 60, 59),
(63, 61, 60),
(64, 63, 61),
(66, 64, 9),
(65, 64, 63),
(67, 65, 56),
(80, 79, 78),
(81, 80, 50),
(82, 80, 55),
(83, 81, 79),
(84, 82, 81),
(85, 83, 82),
(86, 84, 83),
(87, 85, 84),
(88, 86, 85),
(89, 87, 86),
(90, 88, 87),
(91, 89, 88),
(92, 90, 89),
(93, 91, 90),
(94, 92, 91),
(98, 93, 17),
(95, 93, 92),
(96, 94, 29),
(97, 94, 37),
(99, 95, 69),
(101, 96, 60),
(100, 96, 95),
(102, 98, 97),
(103, 99, 98),
(104, 100, 99),
(105, 101, 100),
(106, 102, 148),
(107, 103, 102),
(108, 104, 103),
(115, 110, 104),
(116, 111, 110),
(117, 112, 111),
(120, 113, 4),
(118, 113, 112),
(122, 115, 114),
(123, 116, 115),
(124, 117, 116),
(133, 117, 119),
(125, 120, 119),
(126, 121, 120),
(127, 122, 121),
(128, 123, 122),
(129, 124, 123),
(130, 125, 124),
(132, 126, 16),
(131, 126, 125),
(134, 128, 127),
(135, 129, 128),
(137, 130, 78),
(136, 130, 129),
(138, 131, 84),
(139, 132, 131),
(141, 133, 60),
(140, 133, 132),
(142, 134, 84),
(143, 135, 134),
(144, 136, 135),
(145, 137, 136),
(146, 138, 137),
(147, 139, 138),
(148, 140, 139),
(149, 141, 140),
(150, 142, 141),
(151, 143, 142),
(152, 144, 143),
(153, 145, 144),
(154, 146, 145),
(155, 147, 146),
(156, 148, 101),
(163, 152, 5),
(159, 152, 149),
(165, 156, 4),
(164, 156, 149);

-- --------------------------------------------------------

--
-- Table structure for table `route`
--

CREATE TABLE IF NOT EXISTS `route` (
`ID` int(11) NOT NULL,
  `remarks` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `route`
--

INSERT INTO `route` (`ID`, `remarks`) VALUES
(12, 'Godavari Micro'),
(13, 'Hattiban Micro'),
(14, 'Satdobato Micro'),
(15, 'Lagankhel micro'),
(16, 'Gwarko,imadol Micro Route'),
(17, 'Dhapakhel route'),
(18, 'Bungmati-Lagankhel Route'),
(19, 'Lubhu-Lagankhel Route'),
(20, 'Gaushala-Lagankhel Route'),
(21, 'Chapagaun-Lagankhel Route'),
(22, 'Nakhipot- Ratna Park Route');

-- --------------------------------------------------------

--
-- Table structure for table `route_location`
--

CREATE TABLE IF NOT EXISTS `route_location` (
  `orderID` int(11) NOT NULL,
  `routeID` int(11) NOT NULL,
  `locationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `route_location`
--

INSERT INTO `route_location` (`orderID`, `routeID`, `locationID`) VALUES
(10, 21, 4),
(18, 21, 4),
(79, 22, 4),
(3, 22, 5),
(4, 22, 6),
(5, 22, 7),
(6, 22, 8),
(1, 15, 9),
(5, 14, 9),
(7, 22, 9),
(8, 17, 9),
(9, 13, 9),
(14, 21, 9),
(16, 12, 9),
(18, 19, 9),
(20, 18, 9),
(23, 20, 9),
(68, 15, 9),
(72, 14, 9),
(74, 22, 9),
(76, 13, 9),
(2, 15, 10),
(6, 14, 10),
(8, 22, 10),
(10, 13, 10),
(19, 18, 10),
(21, 18, 10),
(67, 15, 10),
(71, 14, 10),
(73, 22, 10),
(75, 13, 10),
(3, 15, 11),
(7, 14, 11),
(9, 22, 11),
(11, 13, 11),
(18, 18, 11),
(22, 18, 11),
(66, 15, 11),
(70, 14, 11),
(72, 22, 11),
(74, 13, 11),
(4, 15, 12),
(8, 14, 12),
(10, 22, 12),
(12, 13, 12),
(17, 18, 12),
(23, 18, 12),
(65, 15, 12),
(69, 14, 12),
(71, 22, 12),
(73, 13, 12),
(5, 15, 13),
(9, 14, 13),
(11, 22, 13),
(13, 13, 13),
(16, 18, 13),
(24, 18, 13),
(64, 15, 13),
(68, 14, 13),
(70, 22, 13),
(72, 13, 13),
(6, 15, 14),
(10, 14, 14),
(12, 22, 14),
(14, 13, 14),
(15, 18, 14),
(25, 18, 14),
(63, 15, 14),
(67, 14, 14),
(69, 22, 14),
(71, 13, 14),
(7, 15, 15),
(11, 14, 15),
(13, 22, 15),
(14, 18, 15),
(15, 13, 15),
(26, 18, 15),
(62, 15, 15),
(66, 14, 15),
(68, 22, 15),
(70, 13, 15),
(8, 15, 16),
(12, 14, 16),
(13, 18, 16),
(14, 22, 16),
(16, 13, 16),
(27, 18, 16),
(61, 15, 16),
(65, 14, 16),
(67, 22, 16),
(69, 13, 16),
(9, 15, 17),
(13, 14, 17),
(15, 22, 17),
(17, 13, 17),
(60, 15, 17),
(64, 14, 17),
(66, 22, 17),
(68, 13, 17),
(11, 15, 18),
(15, 14, 18),
(16, 16, 18),
(17, 22, 18),
(19, 13, 18),
(52, 16, 18),
(58, 15, 18),
(62, 14, 18),
(64, 22, 18),
(66, 13, 18),
(12, 15, 19),
(16, 14, 19),
(17, 16, 19),
(18, 22, 19),
(20, 13, 19),
(51, 16, 19),
(57, 15, 19),
(61, 14, 19),
(63, 22, 19),
(65, 13, 19),
(13, 15, 20),
(17, 14, 20),
(18, 16, 20),
(19, 22, 20),
(21, 13, 20),
(50, 16, 20),
(56, 15, 20),
(60, 14, 20),
(62, 22, 20),
(64, 13, 20),
(14, 15, 21),
(18, 14, 21),
(19, 16, 21),
(20, 22, 21),
(22, 13, 21),
(49, 16, 21),
(55, 15, 21),
(59, 14, 21),
(61, 22, 21),
(63, 13, 21),
(15, 15, 22),
(19, 14, 22),
(20, 16, 22),
(21, 22, 22),
(23, 13, 22),
(48, 16, 22),
(54, 15, 22),
(58, 14, 22),
(60, 22, 22),
(62, 13, 22),
(16, 15, 23),
(20, 14, 23),
(21, 16, 23),
(22, 22, 23),
(24, 13, 23),
(47, 16, 23),
(53, 15, 23),
(57, 14, 23),
(59, 22, 23),
(61, 13, 23),
(17, 15, 24),
(21, 14, 24),
(22, 16, 24),
(23, 22, 24),
(25, 13, 24),
(46, 16, 24),
(52, 15, 24),
(56, 14, 24),
(58, 22, 24),
(60, 13, 24),
(18, 15, 25),
(22, 14, 25),
(23, 16, 25),
(24, 22, 25),
(26, 13, 25),
(45, 16, 25),
(51, 15, 25),
(55, 14, 25),
(57, 22, 25),
(59, 13, 25),
(19, 15, 26),
(23, 14, 26),
(24, 16, 26),
(25, 22, 26),
(27, 13, 26),
(44, 16, 26),
(50, 15, 26),
(54, 14, 26),
(56, 22, 26),
(58, 13, 26),
(20, 15, 27),
(24, 14, 27),
(25, 16, 27),
(26, 22, 27),
(28, 13, 27),
(43, 16, 27),
(49, 15, 27),
(53, 14, 27),
(55, 22, 27),
(57, 13, 27),
(21, 15, 28),
(25, 14, 28),
(26, 16, 28),
(27, 22, 28),
(29, 13, 28),
(42, 16, 28),
(48, 15, 28),
(52, 14, 28),
(54, 22, 28),
(56, 13, 28),
(22, 15, 29),
(26, 14, 29),
(27, 16, 29),
(28, 22, 29),
(30, 13, 29),
(41, 16, 29),
(47, 15, 29),
(51, 14, 29),
(53, 22, 29),
(55, 13, 29),
(23, 15, 30),
(27, 14, 30),
(29, 22, 30),
(31, 13, 30),
(46, 15, 30),
(50, 14, 30),
(52, 22, 30),
(54, 13, 30),
(24, 15, 31),
(28, 14, 31),
(30, 22, 31),
(32, 13, 31),
(45, 15, 31),
(49, 14, 31),
(51, 22, 31),
(53, 13, 31),
(25, 15, 32),
(29, 14, 32),
(31, 22, 32),
(33, 13, 32),
(44, 15, 32),
(48, 14, 32),
(50, 22, 32),
(52, 13, 32),
(26, 15, 33),
(30, 14, 33),
(32, 22, 33),
(34, 13, 33),
(43, 15, 33),
(47, 14, 33),
(49, 22, 33),
(51, 13, 33),
(27, 15, 34),
(31, 14, 34),
(33, 22, 34),
(35, 13, 34),
(28, 15, 35),
(32, 14, 35),
(34, 22, 35),
(36, 13, 35),
(37, 16, 35),
(42, 15, 35),
(46, 14, 35),
(48, 22, 35),
(50, 13, 35),
(29, 15, 36),
(33, 14, 36),
(35, 22, 36),
(37, 13, 36),
(38, 16, 36),
(29, 16, 37),
(30, 15, 37),
(34, 14, 37),
(36, 22, 37),
(38, 13, 37),
(39, 16, 37),
(30, 16, 38),
(31, 15, 38),
(35, 14, 38),
(37, 22, 38),
(39, 13, 38),
(31, 16, 39),
(32, 15, 39),
(36, 14, 39),
(38, 22, 39),
(40, 13, 39),
(32, 16, 40),
(33, 15, 40),
(37, 14, 40),
(39, 22, 40),
(41, 13, 40),
(33, 16, 41),
(34, 15, 41),
(38, 14, 41),
(40, 22, 41),
(42, 13, 41),
(35, 15, 42),
(39, 14, 42),
(41, 22, 42),
(43, 13, 42),
(36, 15, 43),
(40, 14, 43),
(42, 22, 43),
(44, 13, 43),
(37, 15, 44),
(41, 14, 44),
(43, 22, 44),
(45, 13, 44),
(38, 15, 45),
(42, 14, 45),
(44, 22, 45),
(46, 13, 45),
(34, 16, 46),
(39, 15, 46),
(43, 14, 46),
(45, 22, 46),
(47, 13, 46),
(35, 16, 47),
(40, 15, 47),
(44, 14, 47),
(46, 22, 47),
(48, 13, 47),
(36, 16, 48),
(41, 15, 48),
(45, 14, 48),
(47, 22, 48),
(49, 13, 48),
(1, 12, 49),
(31, 12, 49),
(2, 12, 50),
(30, 12, 50),
(3, 12, 51),
(29, 12, 51),
(4, 12, 52),
(28, 12, 52),
(5, 12, 53),
(27, 12, 53),
(6, 12, 55),
(26, 12, 55),
(7, 12, 56),
(25, 12, 56),
(2, 13, 57),
(9, 12, 57),
(23, 12, 57),
(83, 13, 57),
(3, 13, 58),
(10, 12, 58),
(22, 12, 58),
(82, 13, 58),
(4, 13, 59),
(11, 12, 59),
(21, 12, 59),
(81, 13, 59),
(1, 14, 60),
(4, 17, 60),
(5, 13, 60),
(12, 12, 60),
(12, 17, 60),
(14, 19, 60),
(19, 20, 60),
(20, 12, 60),
(22, 19, 60),
(27, 20, 60),
(76, 14, 60),
(78, 22, 60),
(80, 13, 60),
(2, 14, 61),
(5, 17, 61),
(6, 13, 61),
(11, 17, 61),
(11, 21, 61),
(13, 12, 61),
(15, 19, 61),
(17, 21, 61),
(19, 12, 61),
(20, 20, 61),
(21, 19, 61),
(26, 20, 61),
(75, 14, 61),
(77, 22, 61),
(79, 13, 61),
(3, 14, 63),
(6, 17, 63),
(7, 13, 63),
(10, 17, 63),
(12, 21, 63),
(14, 12, 63),
(16, 19, 63),
(16, 21, 63),
(18, 12, 63),
(20, 19, 63),
(21, 20, 63),
(25, 20, 63),
(74, 14, 63),
(76, 22, 63),
(78, 13, 63),
(4, 14, 64),
(7, 17, 64),
(8, 13, 64),
(9, 17, 64),
(13, 21, 64),
(15, 12, 64),
(15, 21, 64),
(17, 12, 64),
(17, 19, 64),
(19, 19, 64),
(22, 20, 64),
(24, 20, 64),
(73, 14, 64),
(75, 22, 64),
(77, 13, 64),
(1, 13, 65),
(8, 12, 65),
(24, 12, 65),
(84, 13, 65),
(1, 17, 69),
(15, 17, 69),
(1, 16, 78),
(5, 19, 78),
(31, 19, 78),
(67, 16, 78),
(2, 16, 79),
(6, 19, 79),
(30, 19, 79),
(66, 16, 79),
(3, 16, 81),
(7, 19, 81),
(29, 19, 81),
(65, 16, 81),
(4, 16, 82),
(8, 19, 82),
(28, 19, 82),
(64, 16, 82),
(5, 16, 83),
(9, 19, 83),
(27, 19, 83),
(63, 16, 83),
(6, 16, 84),
(10, 19, 84),
(15, 20, 84),
(26, 19, 84),
(31, 20, 84),
(62, 16, 84),
(7, 16, 85),
(61, 16, 85),
(8, 16, 86),
(60, 16, 86),
(9, 16, 87),
(59, 16, 87),
(10, 16, 88),
(58, 16, 88),
(11, 16, 89),
(57, 16, 89),
(12, 16, 90),
(56, 16, 90),
(13, 16, 91),
(55, 16, 91),
(14, 16, 92),
(54, 16, 92),
(10, 15, 93),
(14, 14, 93),
(15, 16, 93),
(16, 22, 93),
(18, 13, 93),
(53, 16, 93),
(59, 15, 93),
(63, 14, 93),
(65, 22, 93),
(67, 13, 93),
(28, 16, 94),
(40, 16, 94),
(2, 17, 95),
(14, 17, 95),
(3, 17, 96),
(13, 17, 96),
(1, 21, 101),
(27, 21, 101),
(3, 21, 102),
(25, 21, 102),
(4, 21, 103),
(24, 21, 103),
(5, 21, 104),
(23, 21, 104),
(6, 21, 110),
(22, 21, 110),
(7, 21, 111),
(21, 21, 111),
(8, 21, 112),
(20, 21, 112),
(9, 21, 113),
(19, 21, 113),
(1, 18, 114),
(39, 18, 114),
(2, 18, 115),
(38, 18, 115),
(3, 18, 116),
(37, 18, 116),
(4, 18, 117),
(36, 18, 117),
(5, 18, 119),
(35, 18, 119),
(6, 18, 120),
(34, 18, 120),
(7, 18, 121),
(33, 18, 121),
(8, 18, 122),
(32, 18, 122),
(9, 18, 123),
(31, 18, 123),
(10, 18, 124),
(30, 18, 124),
(11, 18, 125),
(29, 18, 125),
(12, 18, 126),
(28, 18, 126),
(1, 19, 127),
(35, 19, 127),
(2, 19, 128),
(34, 19, 128),
(3, 19, 129),
(33, 19, 129),
(4, 19, 130),
(32, 19, 130),
(11, 19, 131),
(16, 20, 131),
(25, 19, 131),
(30, 20, 131),
(12, 19, 132),
(17, 20, 132),
(24, 19, 132),
(29, 20, 132),
(13, 19, 133),
(18, 20, 133),
(23, 19, 133),
(28, 20, 133),
(14, 20, 134),
(32, 20, 134),
(13, 20, 135),
(33, 20, 135),
(12, 20, 136),
(34, 20, 136),
(11, 20, 137),
(35, 20, 137),
(10, 20, 138),
(36, 20, 138),
(9, 20, 139),
(37, 20, 139),
(8, 20, 140),
(38, 20, 140),
(7, 20, 141),
(39, 20, 141),
(6, 20, 142),
(40, 20, 142),
(5, 20, 143),
(41, 20, 143),
(4, 20, 144),
(42, 20, 144),
(3, 20, 145),
(43, 20, 145),
(2, 20, 146),
(44, 20, 146),
(1, 20, 147),
(45, 20, 147),
(2, 21, 148),
(26, 21, 148),
(1, 22, 149),
(81, 22, 149),
(2, 22, 152),
(80, 22, 156);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE IF NOT EXISTS `vehicle` (
`ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `typeID` int(11) NOT NULL,
  `routeID` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`ID`, `name`, `typeID`, `routeID`) VALUES
(14, 'Lagankhel Micro(Small)', 1, 15),
(15, 'Lagankhel Micro(Big)', 5, 15),
(16, 'Satdobato Micro', 5, 14),
(17, 'Godawari Micro', 1, 12),
(18, 'Godawari Micro (Big)', 5, 12),
(19, 'Hattiban Micro', 5, 13),
(20, 'Imadole micro', 5, 16),
(21, 'Lagankhel Ratna Park minibus', 2, 15),
(22, 'Imadol Tempo', 4, 16),
(23, 'Godawari-Lagankhel Minibus', 2, 12),
(24, 'Lubhu-Satdobato-Lagankhel Bus', 2, 19);

-- --------------------------------------------------------

--
-- Table structure for table `vehicletype`
--

CREATE TABLE IF NOT EXISTS `vehicletype` (
`ID` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicletype`
--

INSERT INTO `vehicletype` (`ID`, `name`) VALUES
(1, 'SmallMicro'),
(2, 'Bus'),
(4, 'Tempo'),
(5, 'BigMicro');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cost`
--
ALTER TABLE `cost`
 ADD PRIMARY KEY (`ID`), ADD KEY `place1` (`place1`), ADD KEY `place2` (`place2`), ADD KEY `vehicleType` (`vehicleType`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `popular_place`
--
ALTER TABLE `popular_place`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roadway`
--
ALTER TABLE `roadway`
 ADD PRIMARY KEY (`ID`), ADD KEY `point1` (`point1`,`point2`), ADD KEY `point2` (`point2`);

--
-- Indexes for table `route`
--
ALTER TABLE `route`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `route_location`
--
ALTER TABLE `route_location`
 ADD PRIMARY KEY (`orderID`,`routeID`), ADD KEY `routeID` (`routeID`), ADD KEY `locationID` (`locationID`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
 ADD PRIMARY KEY (`ID`), ADD KEY `typeID_2` (`typeID`), ADD KEY `routeID` (`routeID`);

--
-- Indexes for table `vehicletype`
--
ALTER TABLE `vehicletype`
 ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cost`
--
ALTER TABLE `cost`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=157;
--
-- AUTO_INCREMENT for table `popular_place`
--
ALTER TABLE `popular_place`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roadway`
--
ALTER TABLE `roadway`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=166;
--
-- AUTO_INCREMENT for table `route`
--
ALTER TABLE `route`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `vehicletype`
--
ALTER TABLE `vehicletype`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cost`
--
ALTER TABLE `cost`
ADD CONSTRAINT `cost_ibfk_1` FOREIGN KEY (`place1`) REFERENCES `location` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `cost_ibfk_2` FOREIGN KEY (`place2`) REFERENCES `location` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `cost_ibfk_3` FOREIGN KEY (`vehicleType`) REFERENCES `vehicletype` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `roadway`
--
ALTER TABLE `roadway`
ADD CONSTRAINT `roadway_ibfk_1` FOREIGN KEY (`point1`) REFERENCES `location` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `roadway_ibfk_2` FOREIGN KEY (`point2`) REFERENCES `location` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `route_location`
--
ALTER TABLE `route_location`
ADD CONSTRAINT `route_location_ibfk_1` FOREIGN KEY (`routeID`) REFERENCES `route` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `route_location_ibfk_2` FOREIGN KEY (`locationID`) REFERENCES `location` (`ID`) ON UPDATE CASCADE;

--
-- Constraints for table `vehicle`
--
ALTER TABLE `vehicle`
ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`typeID`) REFERENCES `vehicletype` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`routeID`) REFERENCES `route` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
