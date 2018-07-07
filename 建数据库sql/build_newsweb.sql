以下六个建表语句的执行顺序是： 6  1  5  4  2  3
1.class 
CREATE TABLE `class` (
   `classID` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
   `classDescription` varchar(20) NOT NULL,
   PRIMARY KEY (`classID`),
   UNIQUE KEY `classDescription` (`classDescription`)
 ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=gbk;

 2.classify
 CREATE TABLE `classify` (
   `newsID` int(10) unsigned NOT NULL DEFAULT '0',
   `classID` tinyint(3) unsigned NOT NULL DEFAULT '0',
   PRIMARY KEY (`newsID`,`classID`),
   KEY `classID` (`classID`),
   CONSTRAINT `classify_ibfk_1` FOREIGN KEY (`newsID`) REFERENCES `news` (`newsID`),
   CONSTRAINT `classify_ibfk_2` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`)
 ) ENGINE=InnoDB DEFAULT CHARSET=gbk;

 3.comments

 CREATE TABLE `comments` (
   `commentID` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `newsID` int(10) unsigned DEFAULT NULL,
   `userName` varchar(20) DEFAULT NULL,
   `commentText` tinytext NOT NULL,
   `commentPic` varchar(60) DEFAULT NULL,
   `commentTime` datetime NOT NULL,
   PRIMARY KEY (`commentID`),
   KEY `newsID` (`newsID`),
   KEY `userName` (`userName`),
   CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`newsID`) REFERENCES `news` (`newsID`),
   CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userName`) REFERENCES `users` (`userName`)
 ) ENGINE=InnoDB DEFAULT CHARSET=gbk;


 4. give_like

 CREATE TABLE `give_like` (
   `newsID` int(10) unsigned NOT NULL DEFAULT '0',
   `userName` varchar(20) NOT NULL DEFAULT '',
   PRIMARY KEY (`newsID`,`userName`) ,
   KEY `userName` (`userName`),
   CONSTRAINT `give_like_ibfk_1` FOREIGN KEY (`newsID`) REFERENCES `news` (`newsID`),
   CONSTRAINT `give_like_ibfk_2` FOREIGN KEY (`userName`) REFERENCES `users` (`userName`)
 ) ENGINE=InnoDB DEFAULT CHARSET=gbk

 5.news

 CREATE TABLE `news` (
   `newsID` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `title` varchar(200) COLLATE utf8_bin DEFAULT NULL,
   `newsText` text CHARACTER SET gbk NOT NULL,
   `newsPicture` varchar(60) CHARACTER SET gbk DEFAULT NULL,
   `publisher` varchar(20) CHARACTER SET gbk DEFAULT NULL,
   `classID` tinyint(3) unsigned DEFAULT NULL,
   `publishTime` datetime NOT NULL,
   PRIMARY KEY (`newsID`),
   UNIQUE KEY `title` (`title`),
   KEY `publisher` (`publisher`),
   KEY `classID` (`classID`),
   CONSTRAINT `news_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `users` (`userName`),
   CONSTRAINT `news_ibfk_2` FOREIGN KEY (`classID`) REFERENCES `class` (`classID`)
 ) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

 6.user
CREATE TABLE `users` (
   `userName` varchar(20) NOT NULL DEFAULT '',
   `userPassword` varchar(15) NOT NULL,
   `photo` varchar(60) DEFAULT NULL,
   `email` varchar(40) NOT NULL,
   PRIMARY KEY (`userName`)
 ) ENGINE=InnoDB DEFAULT CHARSET=gbk
