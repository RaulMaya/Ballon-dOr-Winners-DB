DROP DATABASE IF EXISTS ballon_dor_db;

CREATE DATABASE ballon_dor_db;

USE ballon_dor_db;

CREATE TABLE nations (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(30)
);

CREATE TABLE clubs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  club VARCHAR(30),
  club_rating INT,
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES nations(id) ON DELETE
  SET
    NULL
);

CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  manager_fn VARCHAR(30),
  manager_ln VARCHAR(30),
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES nations(id) ON DELETE
  SET
    NULL
);

CREATE TABLE winners (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  nation_id INT,
  club_id INT,
  age INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (nation_id) REFERENCES nations(id) ON DELETE
  SET
    NULL,
    FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE
  SET
    NULL,
    FOREIGN KEY (manager_id) REFERENCES managers(id) ON DELETE
  SET
    NULL
);

ALTER TABLE
  winners AUTO_INCREMENT = 1990;