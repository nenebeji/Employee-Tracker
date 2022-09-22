const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'mypassword',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );
  const viewAllDepartments = () => {
    db.query(`SELECT 
    department.id, 
    department.name AS department_name 
    FROM department;`, (err, results) => {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(results);
    })
  }
  
  const viewAllRoles = () => {
    db.query(`SELECT 
    role.id,
    role.title as job_title,
    department.name AS department_name,
    role.salary 
    FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY role.id;`, 
    function (err, results) {
        if (err) {
            console.log(err);
        }
        // console.log('\n');
        console.table(results);
    })
  }
  
  const viewAllEmployees = () => {
    db.query(`SELECT
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
    ORDER BY employee.id;`, 
    function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(results);
    })
  }
  
  const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the new department?",
            name: 'name'
        }
    ])
    .then((data) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, data.name, (err, results) => {
            console.log(`\n ${data.name} department added has been added to the database. See below:`);
            console.log('\n');
            viewAllDepartments();
        })
    })
  }
  
  const addRole = () => {
    let departmentArray = [];
    db.query(`SELECT * FROM department`,  (err, results) => {
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].name);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the new role?",
                name: 'title',
            },
            {
                type: 'input',
                message: "What is the salary for the new role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "What department is the role under?",
                name: 'department',
                choices: departmentArray
            }
        ])
        .then((data) => {
            // Select's department id
            db.query(`SELECT id FROM department WHERE department.name = ?`, data.department, (err, results) => {
                let department_id = results[0].id;
            db.query(`INSERT INTO role(title, salary, department_id)
            VALUES (?,?,?)`, [data.title, data.salary, department_id], (err, results) => {
                console.log(`\n${data.title} has been added to the database. See below:`);
                console.log('\n');
                viewAllRoles();
            })
            });
        })
    })
  }
  
  const addEmployee = () => {
    const roleArray= [];
    const employeeArray= [];
    // populates role array with all roles
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
    // populates employee array with all employees
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }
        return inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last_name',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleArray
            },
            {
                type: 'list',
                message: "Does the employee have a manager?",
                name: 'has_manager',
                choices: ["Yes", "No"]
            }
        ]).then((data) => {
            let role_title = data.role;
            let first_name = data.first_name;
            let last_name = data.last_name;
            let role_id = '';
            let manager = '';
            // populates role id
            db.query(`SELECT id FROM role WHERE role.title = ?`, data.role, (err, results) => {
                role_id = results[0].id;
            });
            if (data.has_manager === "Yes") {
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: "Please select the employees manager",
                    name: 'manager',
                    choices: employeeArray
                    }   
                ]).then((data) => {
                    // get role id
                    db.query(`SELECT id FROM role WHERE role.title = ?`, role_title, (err, results) => {
                        role_id = results[0].id;
                    })
                    db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.manager.split(" "), (err, results) => {
                        manager = results[0].id;
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager], (err, results) => {
                            console.log(`\n${data.first_name} ${data.last_name} has been added to the database. See below:`);
                            console.log('\n');
                            viewAllEmployees();
                        })
                    })
                })
            } else {
                // sets manager to null
                manager = null;
                // get role id
                db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                    role_id = results[0].id;
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES (?,?,?,?)`, [data.first_name, data.last_name, role_id, manager], (err, results) => {
                        console.log(`\n${data.first_name} ${data.last_name} employee added. See below:`);
                        console.log('\n');
                        viewAllEmployees();
                    })
                })
            }
        })
    })
  })
  }
  
  const updateEmployee = () => {
    const roleArray= [];
    const employeeArray= [];
    // populates role array with all roles
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
    // populates employee array with all employees
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }
        return inquirer.prompt([
            {
                type: 'list',
                message: "Which employee do you want to update?",
                name: 'employee',
                choices: employeeArray
            },
            {
                type: 'list',
                message: "What is the employee's new role?",
                name: 'role',
                choices: roleArray
            },
        ]).then((data) => {
            // get role id
            db.query(`SELECT id FROM role WHERE role.title = ?;`, data.role, (err, results) => {
                role_id = results[0].id;
                db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.employee.split(" "), (err, results) => {
                    db.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [role_id, results[0].id], (err, results) => {
                        console.log(`\n${data.employee} has been updated in the database. See below:`);
                        console.log('\n');
                        viewAllEmployees();
                    })
                })
  
            })
        })
    })
  })
  }
  
  const updateEmployeeManager = () => {
    // const managerArray= [];
    const employeeArray= [];
  
    // populates employee array with all employees
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }
        return inquirer.prompt([
            {
                type: 'list',
                message: "Which employee do you want to update?",
                name: 'employee',
                choices: employeeArray
            },
            {
                type: 'list',
                message: "Please select the employees manager",
                name: 'manager',
                choices: employeeArray
            }   
        ]).then((data) => {
                // get employee id
                db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.manager.split(" "), (err, results) => {
                    manager = results[0].id;
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                    VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager], (err, results) => {
                        console.log(`\n${data.first_name} ${data.last_name} has been added to the database. See below:`);
                        console.log('\n');
                        ViewEmployeesByManager();
                    })
                })
            })
        })
  }
  
  const ViewEmployeesByManager = () => {
    db.query(`SELECT
    employee.id,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, 
    employee.first_name,
    employee.last_name 
    FROM employee 
    AS manager RIGHT OUTER JOIN employee ON manager.id = employee.manager_id
    ORDER BY employee.id;`, 
    function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(results);
    })
  }
  
  const ViewEmployeesByDepartment = () => {
    db.query(`SELECT 
    employee.id,
    department.name AS department_name,
    employee.first_name,
    employee.last_name
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY employee.id;`, 
    function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(results);
    })
  }
  
  const TotalBudget = () => {
    db.query(`SELECT
    department.name AS department_name,
    SUM(salary) AS total_utilized_budget
    FROM role
    JOIN department ON role.department_id = department.id
    GROUP BY department.name;`, 
    function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log('\n');
        console.table(results);
    })
  }
  
  const Quit = () => {
    return `^C`;
  }

module.exports = {viewAllDepartments, 
                  viewAllRoles, 
                  viewAllEmployees, 
                  addDepartment, 
                  addRole, 
                  addEmployee, 
                  updateEmployee, 
                  updateEmployeeManager, 
                  ViewEmployeesByManager, 
                  ViewEmployeesByDepartment, 
                  TotalBudget
                }