// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

const starterprompt = () => {
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
              'Update employe manager',
              'View employees by manager',
              'View employees by department',
              'View total utilized budget by department'
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

          case 'Update an employee manager':
              updateEmployeeManager();
              break; 

          case 'View employees by manager':
              ViewEmployeesByManager();
              break;

          case 'View employees by department':
              ViewEmployeesByDepartment();
              break;

          case 'View total utilized budget by department':
              TotalBudget();
              break;   
      }
  })
};

// Initiates user prompt
starterprompt();