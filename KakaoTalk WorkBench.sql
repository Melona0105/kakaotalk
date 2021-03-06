-- MySQL Script generated by MySQL Workbench
-- Sun Jan 16 23:02:00 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema KakaoTalk
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema KakaoTalk
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `KakaoTalk` DEFAULT CHARACTER SET utf8 ;
USE `KakaoTalk` ;

-- -----------------------------------------------------
-- Table `KakaoTalk`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `KakaoTalk`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(200) NULL,
  `birth` VARCHAR(45) NULL,
  `music` VARCHAR(45) NULL,
  `comment` VARCHAR(45) NULL,
  `photo` BLOB NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `KakaoTalk`.`friends`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `KakaoTalk`.`friends` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `friend_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_friend_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_friend_user2_idx` (`friend_id` ASC) VISIBLE,
  CONSTRAINT `fk_friend_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `KakaoTalk`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_friend_user2`
    FOREIGN KEY (`friend_id`)
    REFERENCES `KakaoTalk`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `KakaoTalk`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `KakaoTalk`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `noti` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `KakaoTalk`.`chats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `KakaoTalk`.`chats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `content` VARCHAR(200) NULL,
  `room_id` INT NULL,
  `read` TINYINT NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_chat_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_chat_room_id_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_chat_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `KakaoTalk`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_chat_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `KakaoTalk`.`rooms` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `KakaoTalk`.`users_in_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `KakaoTalk`.`users_in_rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `room_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_in_room_user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_users_in_room_room_id_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_in_room_user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `KakaoTalk`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_in_room_room_id`
    FOREIGN KEY (`room_id`)
    REFERENCES `KakaoTalk`.`rooms` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
