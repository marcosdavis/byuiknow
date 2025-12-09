-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema my_byuiknow
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `my_byuiknow` ;

-- -----------------------------------------------------
-- Schema my_byuiknow
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_byuiknow` ;
USE `my_byuiknow` ;

-- -----------------------------------------------------
-- Table `my_byuiknow`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_byuiknow`.`users` (
  `user_id` INT NOT NULL,
  `fname` VARCHAR(45) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_byuiknow`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_byuiknow`.`comment` (
  `comment_id` INT NOT NULL,
  `comment_content` LONGTEXT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comment_users_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_byuiknow`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_byuiknow`.`question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_byuiknow`.`question` (
  `question_id` INT NOT NULL,
  `title` MEDIUMTEXT NOT NULL,
  `question_content` LONGTEXT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `fk_question_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_question_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_byuiknow`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_byuiknow`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_byuiknow`.`tag` (
  `tag_id` INT NOT NULL,
  `tag_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tag_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_byuiknow`.`question_has_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `my_byuiknow`.`question_has_tag` (
  `question_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`question_id`, `tag_id`),
  INDEX `fk_question_has_tag_tag1_idx` (`tag_id` ASC) VISIBLE,
  INDEX `fk_question_has_tag_question1_idx` (`question_id` ASC) VISIBLE,
  CONSTRAINT `fk_question_has_tag_question1`
    FOREIGN KEY (`question_id`)
    REFERENCES `my_byuiknow`.`question` (`question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question_has_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `my_byuiknow`.`tag` (`tag_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
