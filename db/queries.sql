-- Department Table
SELECT 
department.id,
department.name AS department_name 
FROM department;

-- Role Table
SELECT 
role.id,
role.title as job_title,
department.name AS department_name,
role.salary 
FROM role 
JOIN department ON role.department_id = department.id
ORDER BY role.id;

-- Employee Table
SELECT * FROM employee;

-- Add a department

-- Add a role

-- Add an Employee

-- Employee details with manager 
SELECT
employee.id, 
employee.first_name,
employee.last_name,
role.title AS job_title,
department.name AS department_name,
role.salary,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 
FROM employee
AS manager RIGHT OUTER JOIN employee ON manager.id = employee.manager_id
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY employee.id;

-- Update Employee Managers 

-- View Employees by Manager
SELECT
employee.id,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, 
employee.first_name,
employee.last_name 
FROM employee 
AS manager RIGHT OUTER JOIN employee ON manager.id = employee.manager_id
ORDER BY employee.id;

-- View Employees by Department
SELECT 
employee.id,
department.name AS department_name,
employee.first_name,
employee.last_name
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY employee.id;

-- Delete Department, roles and employees
-- Delete Department

-- Delete Role

-- Delete Employee

-- View total utilized budget of a department
SELECT
department.name AS department_name,
SUM(salary) AS total_utilized_budget
FROM role 
JOIN department ON role.department_id = department.id
GROUP BY department.name;

SELECT
department.name AS department_name,
SUM(salary) AS total_utilized_budget
FROM role 
JOIN department ON role.department_id = department.id
WHERE department_id = '4';

-- SELECT * FROM total_budget WHERE department_name = 'Engineering';
