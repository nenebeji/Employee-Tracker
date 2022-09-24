// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  console.log(`\nConnected to the employees_db database.`)
);

// function to start prompt with first question
const starterPrompt = () => {
  return inquirer.prompt([
      {
          type: 'list',
          message: 'What would you like to do?',
          name: 'selection',
          choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee',
              'Update employee managers',
              'View employees by manager',
              'View employees by department',
              'Delete department, roles and employees',
              'View total utilized budget by department',
              'Quit Application'
          ]
      }
  ])
  .then((data) => {
      switch (data.selection) {
          case 'View all departments':
              viewAllDepartments();
              break;

          case 'View all roles':
              viewAllRoles();
              break;
              
          case 'View all employees':
              viewAllEmployees();
              break;
          
          case 'Add a department':
              addDepartment();
              break;
      
          case 'Add a role':
              addRole();
              break;
          
          case 'Add an employee':
              addEmployee();
              break;
              
          case 'Update an employee':
              updateEmployee();
              break;

          case 'Update employee managers':
              updateEmployeeManager();
              break; 

          case 'View employees by manager':
              ViewEmployeesByManager();
              break;

          case 'View employees by department':
              ViewEmployeesByDepartment();
              break;
          
          case 'Delete department, roles and employees':
               deleteData();
               break;

          case 'View total utilized budget by department':
              TotalBudget();
              break; 
          case 'Quit Application':
            console.log(`\nYou have Quit the Application`)
            break;    
      }
  })
};

// Initiates user prompt
starterPrompt();

//function to view all Departments in the database
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
      starterPrompt();
  })
}

//function to view all roles in the database
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
      console.log('\n');
      console.table(results);
      starterPrompt();
  })
}

// function to view all employees in the database
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
      starterPrompt();
  })
}

// function to add department to the database
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
          console.log(`\n ${data.name} department has been added to the database. See below:`);
          console.log('\n');
          viewAllDepartments();
      })
  })
}

// function to add role and display table
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

// function to add an employee
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
              db.query(`SELECT id FROM role WHERE role.title = ?`, role_title, (err, results) => {
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

// Function to update employee role
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
                      console.log(`\n${data.employee}'s job title has been updated to ${data.role} in the database. See below:`);
                      console.log('\n');
                      viewAllEmployees();
                  })
              })

          })
      })
  })
})
}

// Function to update employee manager and view table of employees by manager
const updateEmployeeManager = () => {
  const managerArray= [];
  const employeeArray= [];

  // populates manager array with all potential managers
  db.query(`SELECT * FROM employee AS manager`, function (err, results) {
      for (let i = 0; i < results.length; i++) {
          let managerName = `${results[i].first_name} ${results[i].last_name}`
          managerArray.push(managerName);
      }
      // populate employee array with all employees
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
              choices: managerArray
          }   
      ]).then((data) => {
              // get manager id
              db.query(`SELECT id FROM employee AS manager WHERE manager.first_name = ? AND manager.last_name = ?;`, data.manager.split(" "), (err, results) => {
                  manager_id = results[0].id;
                  db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`,data.employee.split(" "), (err, results) => {
                    db.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`, [manager_id, results[0].id], (err, results) => {
                      console.log(`\n${data.employee}'s manager has been updated to ${data.manager} in the database. See below:`);
                      console.log('\n');
                      ViewEmployeesByManager();
                    })
                  })
              })
          })
     })
  })
}

// function to view employees by manager table
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
      starterPrompt();
  })
}

//function to view the employees by department table
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
      starterPrompt();
  })
}

//function to get the Total utilized budget per department table
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
      starterPrompt();
  })
}

// Delete Department, Role or Employee from Database
const deleteData = () => {
  return inquirer.prompt([
    {
        type: 'list',
        message: "Which Data would you like to delete from the database?",
        name: 'DeleteRequest',
        choices: ['Department', 'Role', 'Employee', 'None']
    }, 
]).then((data) => {
  switch(data.DeleteRequest) {
    case 'Department':
      DeleteDepartment();
      break;

    case 'Role':
      DeleteRole();
      break;

    case 'Employee':
      DeleteEmployee();
      break;
    default: starterPrompt();
  }
})
}

//Delete A Department function
const DeleteDepartment = () => {
  let departmentArray = [];
  db.query(`SELECT * FROM department`,  (err, results) => {
      for (let i = 0; i < results.length; i++) {
          departmentArray.push(results[i].name);
      }
  return inquirer.prompt([
    {
        type: 'list',
        message: "Which Department would you like to delete?",
        name: 'deldep',
        choices: departmentArray
    }
])
 .then((data) => {
    db.query (`SELECT id FROM department WHERE department.name = ?`, data.deldep, (err, results) => {
      let department_id = results[0].id;
      db.query(`DELETE FROM department WHERE id = ?`, department_id, (err, results) => {
        console.log(`\n ${data.deldep} department has been deleted from the database. See below:`);
        viewAllDepartments();
    })
  })
  })
})
}


//Delete A Role function
const DeleteRole = () => {
  let roleArray = [];
  db.query(`SELECT * FROM role`,  (err, results) => {
      for (let i = 0; i < results.length; i++) {
          roleArray.push(results[i].title);
      }
  return inquirer.prompt([
    {
        type: 'list',
        message: "What Role would you like to delete?",
        name: 'delrol',
        choices: roleArray
    }
])
 .then((data) => {
    db.query (`SELECT id FROM role WHERE role.title = ?`, data.delrol, (err, results) => {
      let role_id = results[0].id;
      db.query(`DELETE FROM role WHERE id = ?`, role_id, (err, results) => {
        console.log(`\n The ${data.delrol} role has been deleted from the database. See below:`);
        viewAllRoles();
    })
  })
  })
})
}

//Delete An Employee function
const DeleteEmployee = () => {
  let employeeArray = [];
  db.query(`SELECT * FROM employee`,  (err, results) => {
      for (let i = 0; i < results.length; i++) {
        let employeeName = `${results[i].first_name} ${results[i].last_name}`
        employeeArray.push(employeeName);
      }
  return inquirer.prompt([
    {
        type: 'list',
        message: "Which Employee would you like to delete?",
        name: 'delemp',
        choices: employeeArray
    }
])
 .then((data) => {
    db.query (`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, data.delemp.split(" "),  (err, results) => {
      let employee_id = results[0].id;
      db.query(`DELETE FROM employee WHERE id = ?`, employee_id, (err, results) => {
        console.log(`\n ${data.delemp} has been deleted from the database. See below:`);
        viewAllEmployees();
      })
    })
  })
})
}
