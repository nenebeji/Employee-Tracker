DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
--   FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE employee ADD FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL;

-- View for managers with employee
-- CREATE VIEW manager_employees AS
-- (SELECT
-- staff.id,
-- staff.first_name,
-- staff.last_name,
-- CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
-- FROM employee AS manager RIGHT OUTER JOIN employee AS staff ON manager.id = staff.manager_id);

-- CREATE VIEW total_budget AS 
-- (SELECT 
-- department.name AS department_name,
-- SUM(salary) AS total_utilized_budget
-- FROM role
-- JOIN department ON role.department_id = department.id
-- GROUP BY department.name);