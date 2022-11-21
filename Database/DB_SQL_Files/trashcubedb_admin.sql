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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `system_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `system_id_idx` (`system_id`),
  CONSTRAINT `system_id` FOREIGN KEY (`system_id`) REFERENCES `systemsettings` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2,'Nileeka','Abeynayake','nikabey','hello',1),(3,'Hashini','Sharintha','hash123','wersd',1),(4,'Vidu','Kalpana','viduk1','hellomyt',1),(5,'Bihara','Till','bihara@','bi123',1),(6,'B','T','bt','bt123',1),(7,'Hansika','Dulara','hansi','weahng%$',1),(11,'Miranda','Zoya','mirandzoy','r784%#',1),(12,'Leo','Thomas','leothom','bileo#$',1),(14,'Kumara','Dharmasena','kumar@','$2b$10$VAi5ovkpZm4s6E9Aumus3O7Wo56QjG9Vr3NNALrxHRtiHsFKVa7Ti',1),(15,'Kamal','Hassan','kmhassan','$2b$10$jhX/5HfAlmkFiBgKOfac4.bNsGZJHet.eIeheHVmcBRpKgGZluOSK',1),(16,'Dinusha','Bandara','dinuban','$2b$10$obJ7hVxS1oah1ociEUCbIO0kT9IOi5AAtk6aUeJ49p2ICU7XEJcye',1),(17,'Nipu','Ume','nipume','$2b$10$ikivvzmog1O/r1MCpnoqg.2e/mZV5uV.DOwXMrf3Sergozvprx.ZO',1),(18,'Ramya','Perera','ramsi','$2b$10$0j5xAwMxlX3/XmwDGq0aHOChTw3bj4scRXEX94j46Vf/z/y5cl2eu',1),(19,'Ramyaa','Pereraa','ramsii','$2b$10$wxdoDqV4Hq1y0X2b8XKIserTVprkj1i7tzu3rr.5qMaGmIQA5fK4O',1),(20,'Isara','Till','isara123','$2b$10$yGo09/IeaEZzkGNnfCI0DOPdgE1Y4m79QujSrRQm6suhJ0XEntZPC',1),(22,'Sanath','Jayasuriya','sanaJ','$2b$10$SrmmYA1M..jwwbCKT.iu..jmzG.eCrO3S.t3sTQOS1cEMoObHY1L.',1),(23,'Lasith','Malinga','lamali','$2b$10$irNDuvVGcVAY30qEec6kmOCTi7BzAuGg9u9/E9Vgzg8Dtjl7bFc2u',1),(24,'janethri','Till','jane123','$2b$10$Db4CVoyOzUyMyY6vTzQ4PuUqczBvoFl321byIN/nzbEz6DQhnLvfG',1),(25,'janethriiii','Till','jane1234','$2b$10$5axOESzbJT81Bj70LxXqb.qMojsBpVj6W48DjgrEu9.SPee7u/XIa',1),(26,'Maithri','Karuna','maikaru','$2b$10$eizzlfC77jqIkQI.O0IIB.PbZWet7LlH6CqyDvS/.l8Q6Gw5XiMEW',1),(27,'11ff','Till','maiun','$2b$10$i3IdFOUu2MTGSCZeeJtom.pTyzcWpWQYg/uH53cOHRmgudiYrCzN2',1),(28,'Nehara','Pieris','nehaP','$2b$10$rMqD.Abfg66diYTCXTp25.XnYTzSVhbF6vvR3ZdN/5HobVzQsw6uO',1),(29,'wfw','','sdfa','$2b$10$k9ecKgicC8AHl80zWzJQmOCLagWaSLbUnCo9lxwx7WP1mctuZ/0Xm',1),(30,'Nuwanjan','Silva','nuwan123','$2b$10$9jCeFt3ylnlNNCjKpgKpp.H5em4lF2b1NC4l5gvoNHTaSQvTPPmge',1),(31,'Ruwani','Silva','ruwaniS','$2b$10$F45LnoIKbe99lgnfVTHNmeqkez4uU.Iy3Ffd1Fcf/hCyfba.k4ML.',1),(33,'Nuwani','Silva','nuwaniS','$2b$10$2VzKR9AFKyTl81B0bi0c8eH5T9kvGv1JM4gumumxO3NyC/TIUUPL.',1),(34,'rashini','savishka','savishka','$2b$10$Op.Q0Jc0if59BuqvF7nF0.xhjaxTl40tIILc7SIDKO9/6Zz6.f8gu',1),(35,'damsy','damsy','damsy','$2b$10$.cJa16vXguXU10/IszHguOUzHUp8G8azDpCIF5v/kc0Ezn/ORoKlK',1),(36,'sachini','wathsala','sachini','$2b$10$jFI.GV/9EVQJG8ix15SDaO4WlSmItkc3VQ0wuXlGQszgSOrZaRS56',1),(37,'rajitha','pramod','rajitha','$2b$10$iT6S.xkMHCk33rx0wDb7sev7QECraCz9k0i2nDvH2R5k3DhccRKNO',1),(38,'manel','srimathi','manel','$2b$10$Y0acbARoLWzqIxscezGItu63xebRGpG5AcsG3LJNoqadDxe3z1HkO',1),(39,'isuru','isuru','isuru','$2b$10$cGLdAKwaj0VI7aZEAn0pteZ3l9Thl6kS/OaaA6uQYw6owCR9mWZR2',1),(40,'Ruk','Perera','rukperera','$2b$10$cURsl1hWgY9RVhSg5CIzSuFav28tnwfIr6/UNovRBXpJpURRpsvtS',1),(41,'janith','janith','janith','$2b$10$V/QKqs3.jU1GslgALyyyiOG.Z28xkvUbbZWQ/5W9wmtSqQQHQALu2',1),(42,'oshadi','dilanka','oshadi','$2b$10$8cMq5bvM3zfYL0Au2G.y1u6tInROwx9e7g.AG1yxOS6yaiZX1Mw0u',1),(43,'Dewni','Pathirana','Dewni','$2b$10$kv8.o9lWKEvTzmyKmgN5E./XAlltpdrbRizzCkYipJwiHBLKf9W12',1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
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

-- Dump completed on 2022-11-21 11:36:42
