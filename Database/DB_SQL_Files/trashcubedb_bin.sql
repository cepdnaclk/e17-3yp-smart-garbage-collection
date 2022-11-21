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
-- Table structure for table `bin`
--

DROP TABLE IF EXISTS `bin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(10) NOT NULL,
  `fill_level` int DEFAULT NULL,
  `color` varchar(1) DEFAULT NULL,
  `battery` varchar(6) DEFAULT NULL,
  `compaction_cycles` int DEFAULT NULL,
  `unit_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unit_id_idx` (`unit_id`),
  CONSTRAINT `unit_id` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bin`
--

LOCK TABLES `bin` WRITE;
/*!40000 ALTER TABLE `bin` DISABLE KEYS */;
INSERT INTO `bin` VALUES (1,'Food',0,'g','HIGH',NULL,1),(2,'Paper',60,'y','HIGH',3,1),(3,'Polythene',79,'y','MEDIUM',1,1),(4,'Other',45,'g','MEDIUM',0,1),(39,'Food',83,'r','HIGH',0,2),(40,'Paper',78,'y','HIGH',2,2),(41,'Polythene',48,'g','HIGH',2,2),(42,'Other',32,'g','HIGH',0,2),(43,'Food',55,'y','HIGH',0,3),(44,'Paper',67,'y','LOW',2,3),(45,'Polythene',91,'r','LOW',3,3),(46,'Other',43,'g','LOW',0,3),(47,'Food',20,'g','LOW',0,4),(48,'Paper',10,'g','MEDIUM',1,4),(49,'Polythene',89,'r','MEDIUM',3,4),(50,'Other',67,'y','MEDIUM',0,4),(51,'Food',55,'y','MEDIUM',0,5),(52,'Paper',35,'g','MEDIUM',2,5),(53,'Polythene',67,'y','MEDIUM',3,5),(54,'Other',98,'r','MEDIUM',0,5),(55,'Food',23,'g','MEDIUM',0,6),(56,'Paper',43,'g','HIGH',2,6),(57,'Polythene',67,'y','HIGH',2,6),(58,'Other',87,'r','HIGH',NULL,6),(59,'Food',NULL,NULL,NULL,NULL,7),(60,'Paper',NULL,NULL,NULL,NULL,7),(61,'Polythene',NULL,NULL,NULL,NULL,7),(62,'Other',NULL,NULL,NULL,NULL,7),(63,'Food',NULL,NULL,NULL,NULL,8),(64,'Paper',NULL,NULL,NULL,NULL,8),(65,'Polythene',NULL,NULL,NULL,NULL,8),(66,'Other',NULL,NULL,NULL,NULL,8),(79,'Food',NULL,NULL,NULL,NULL,9),(80,'Paper',NULL,NULL,NULL,NULL,9),(81,'Polythene',NULL,NULL,NULL,NULL,9),(82,'Other',NULL,NULL,NULL,NULL,9),(83,'Food',NULL,NULL,NULL,NULL,10),(84,'Paper',NULL,NULL,NULL,NULL,10),(85,'Polythene',NULL,NULL,NULL,NULL,10),(86,'Other',NULL,NULL,NULL,NULL,10),(87,'Food',NULL,NULL,NULL,NULL,11),(88,'Paper',NULL,NULL,NULL,NULL,11),(89,'Polythene',NULL,NULL,NULL,NULL,11),(90,'Other',NULL,NULL,NULL,NULL,11),(91,'Food',NULL,NULL,NULL,NULL,12),(92,'Paper',NULL,NULL,NULL,NULL,12),(93,'Polythene',NULL,NULL,NULL,NULL,12),(94,'Other',NULL,NULL,NULL,NULL,12),(107,'Food',NULL,NULL,NULL,NULL,21),(108,'Paper',NULL,NULL,NULL,NULL,21),(109,'Polythene',NULL,NULL,NULL,NULL,21),(110,'Other',NULL,NULL,NULL,NULL,21);
/*!40000 ALTER TABLE `bin` ENABLE KEYS */;
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

-- Dump completed on 2022-11-21 11:36:31
