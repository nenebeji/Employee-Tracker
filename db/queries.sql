-- SELECT
-- employee.first_name,
-- employee.last_name,
-- role.salary
-- FROM employee
-- JOIN role ON employee.role_id = role.id,
-- JOIN employee ON employee.manager_id = employee.id;

-- SELECT
-- department.name
-- FROM role
-- JOIN department ON role.department_id = department.id;

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;
-- SELECT 
-- department.name
-- FROM role JOIN department ON role.department_id = department.id;

SELECT
employee.id, 
employee.first_name,
employee.last_name,
role.title AS role,
department.name AS department,
role.salary
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
ORDER BY employee.id;

