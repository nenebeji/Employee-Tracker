-- Department
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Legal"),
       ("Service"),
       ("IT"),
       ("Sales"),
       ("Marketing");

-- Roles
INSERT INTO role (title, salary, department_id)
VALUES ("Contract Engineer", 40000, 1),
       ("DevOps", 95000, 4),
       ("Lawyer", 55000, 2),
       ("Customer Service", 28000, 3),
       ("Full-Stack developer", 100000, 4),
       ("PR Manager", 35000, 6),
       ("Sales Executive", 40000, 5),
       ("Sales Trainee", 20000, 5),
       ("Project Engineer", 65000, 1);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nene", "Beji", 1, 2),
       ("Bumi", "Beeves", 9, NULL),
       ("Steve", "Johnson", 3, NULL),
       ("Ren", "Antil", 5, NULL),
       ("Nev", "Bill", 2, 4),
       ("Harry", "Styles", 4, 2),
       ("Joseph", "Williams", 6, 8),
       ("Gill", "Bookes", 7, NULL),
       ("Nnenna", "Chuks", 8, 8),
       ("Brooklyn", "Fyne", 8, 8),
       ("Boor", "Billy", 7, NULL),
       ("Philip", "Iren", 2, 4);


