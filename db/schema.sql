DROP DATABASE IF EXISTS ballon_dor_db;

CREATE DATABASE ballon_dor_db;

USE ballon_dor_db;

CREATE TABLE winners (
  year_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  club VARCHAR(30) NOT NULL,
  nation VARCHAR(30) NOT NULL,
  age INT NOT NULL,
  coach VARCHAR(30)
);

ALTER TABLE
  winners AUTO_INCREMENT = 1990;

CREATE TABLE clubs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  club VARCHAR(30),
  club_rating INT FOREIGN KEY (club) REFERENCES winners(club) ON DELETE
  SET
    NULL
);

CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  manager_name VARCHAR(30) FOREIGN KEY (manager_name) REFERENCES winners(coach) ON DELETE
  SET
    NULL
);