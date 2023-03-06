DROP DATABASE IF EXISTS ballon_dor_db;
CREATE DATABASE ballon_dor_db;

USE ballon_dor_db;

CREATE TABLE winners (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  club VARCHAR(30) NOT NULL,
  nation VARCHAR(30) NOT NULL,
  age VARCHAR(5) NOT NULL,
  win_year VARCHAR(5) NOT NULL
);
