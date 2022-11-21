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
-- Table structure for table `collector`
--

DROP TABLE IF EXISTS `collector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(80) NOT NULL,
  `latitude` decimal(5,4) DEFAULT '0.0000',
  `longitude` decimal(6,4) DEFAULT '0.0000',
  `tasks` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collector`
--

LOCK TABLES `collector` WRITE;
/*!40000 ALTER TABLE `collector` DISABLE KEYS */;
INSERT INTO `collector` VALUES (1,'Nimal','Withana','nmwth','nmal1#',6.8063,79.9253,11),(2,'Sumal','Perera','sp21','grape',6.8020,79.9220,16),(3,'Mewan','Silva','mwsl','paper',6.8035,79.9166,30),(4,'Kumara','Roy','kkma','kk123',6.7982,79.9278,4),(8,'Hashini','Wijerathne','Hashi','$2b$15$RhTjTshCeIwnCmhs4l3zUO4TEDwFfoZ2NrTsk5',6.7900,79.9300,0),(9,'Vidurangi ','Kalpana','Vidu','$2b$15$a9dOOic2eVJqpSdwmOKsnOsjZmpQm1lvwn1SoK',6.8900,79.8900,0),(10,'rashini','savishka','rashini','$2b$15$rj3T.WQHXCXv47QYTUjrTeQdIR3yJG/eliK9Ll',0.0000,0.0000,0),(11,'nipuni','savishka','nipuni','$2b$15$SOjBYi1hKiocCMsVsqERPuNqqTU9IGY7FsdbinpdxvYX6P9s/3gyW',0.0000,0.0000,6),(12,'hasini','savishka','hasini','$2b$15$SGTrG2mqVAUMA1NEsOZnsOBGyvJ3G2tOjlulFwQiN.9/T8wfB0jZu',0.0000,0.0000,0),(13,'janith','savishka','janith','$2b$15$eoc2Y.6qMFCH9rFL58.Rd.XmpJ93expL6zmH7S9E/3ckpCCgiLOlK',6.8900,70.6543,0),(14,'anith','savishka','anith','$2b$15$shoHdgrdQj3lwF0pWVSrJe3pi64NiKU5Rg0AGV8UhV2XBK4TW6XS6',0.0000,0.0000,0),(15,'Namal','Perera','Namal','$2b$15$8DBXGQckznNNP6kQsrFRxu66/EZVkcREU1iu863pBa0ztJYnHrjxK',0.0000,0.0000,0);
/*!40000 ALTER TABLE `collector` ENABLE KEYS */;
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

-- Dump completed on 2022-11-21 11:36:57
