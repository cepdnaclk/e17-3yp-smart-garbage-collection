-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: trashcubedb.ceccigkwhlud.ap-northeast-1.rds.amazonaws.com    Database: trashcubedb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `assign`
--

DROP TABLE IF EXISTS `assign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assign` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int DEFAULT '2',
  `bin_id` int DEFAULT NULL,
  `collector_id` int DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`request_id`),
  KEY `bin_id_idx` (`bin_id`),
  KEY `admin_id_idx` (`admin_id`),
  KEY `collector_id_idx` (`collector_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `bin_id` FOREIGN KEY (`bin_id`) REFERENCES `bin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `collector_id` FOREIGN KEY (`collector_id`) REFERENCES `collector` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assign`
--

LOCK TABLES `assign` WRITE;
/*!40000 ALTER TABLE `assign` DISABLE KEYS */;
INSERT INTO `assign` VALUES (2,3,2,11,'Sent','22/11/2022 @ 9:14:1'),(3,3,3,11,'Sent','22/11/2022 @ 10:26:1'),(4,5,4,11,'Sent','22/11/2022 @ 11:37:1'),(5,5,39,2,'Completed','19/11/2022 @ 6:30:1'),(8,3,42,3,'Completed','20/11/2022 @ 7:37:1'),(9,5,43,1,'Declined','20/11/2022 @ 8:48:1'),(10,2,44,2,'Completed','20/11/2022 @ 9:37:1'),(11,2,45,3,'Completed','21/11/2022 @ 10:56:1'),(68,2,2,11,'Accepted','21/11/2022 @ 12:24:1'),(73,2,1,11,'Declined','21/11/2022 @ 10:39:1');
/*!40000 ALTER TABLE `assign` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 11:37:03
