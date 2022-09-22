-- Department Table
SELECT * FROM department;

-- Role Table
SELECT * FROM role;

-- Employee Table
SELECT * FROM employee;

-- Employee details no manager 
SELECT
employee.id, 
employee.first_name,
employee.last_name,
role.title AS role,
department.name AS department,
role.salary,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name 
FROM employee
AS manager RIGHT OUTER JOIN employee ON manager.id = employee.manager_id
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY employee.id;



