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
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(45) NOT NULL,
  `latitude` decimal(5,4) DEFAULT '0.0000',
  `longitude` decimal(6,4) DEFAULT '0.0000',
  `zone_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `location_UNIQUE` (`location`),
  KEY `zone_id_idx` (`zone_id`),
  CONSTRAINT `zone_id` FOREIGN KEY (`zone_id`) REFERENCES `zone` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'A',6.8064,79.9148,1),(2,'B',6.8055,79.9170,1),(3,'C',6.8046,79.9138,1),(4,'D',6.8040,79.9199,1),(5,'E',6.8028,79.9156,1),(6,'F',6.8012,79.9147,2),(7,'G',6.7990,79.9160,2),(8,'H',6.8004,79.9196,2),(9,'I',6.7975,79.9168,2),(10,'J',6.7980,79.9188,2),(11,'K',6.8029,79.9215,3),(12,'L',6.8052,79.9215,3),(13,'M',6.8039,79.9247,3),(14,'N',6.8020,79.9268,3),(15,'O',6.8070,79.9248,3),(16,'P',6.7994,79.9230,4),(17,'Q',6.7992,79.9288,4),(18,'R',6.7998,79.9252,4),(19,'S',6.7971,79.9239,4),(20,'T',6.8022,79.9288,4),(21,'honnanthara',0.0000,0.0000,NULL);
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
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

-- Dump completed on 2022-11-21 11:37:08
