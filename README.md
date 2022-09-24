# Notebook
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Project Description](#project-description)

- [Installation](#installation)

- [Screenshots](#screenshots)

- [Usage](#usage)

- [How to Contribute](#how-to-contribute)

- [Tests](#test)

- [Questions](#questions)

- [References](#references)

 - [Walthrough Video](#walkthrough-video)

- [License](#license)

## Project Description

This is a command-line application that allows a company(user) to manage employee's database.

* When a user starts this application, they are presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update an employee role, update employee managers, view employees by manager, view employees by department, delete department, roles and employees, View total utilized budget by department and quit application.

* When they choose to view all departments, they are presented with a formatted table showing department names and department ids.

* When they choose to view all roles, they are presented with the job title, role id, the department that role belongs to, and the salary for that role.

* When they choose to view all employees, they are presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

* When they choose to add a department, they prompted to enter the name of the department and that department is added to the database and a table of the updated database is displayed.

* When they choose to add a role, they are prompted to enter the name, salary, and department for the role and that role is added to the database and a table of the updated database is displayed.

* When they choose to add an employee, they are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database and a table of the updated database is displayed.

* When they choose to update an employee role, they are prompted to select an employee to update and their new role and this information is updated in the database and a table of the updated database is displayed.

* When they choose to update an employee managers, they are prompted to select an employee to update and their new manager and this information is updated in the database, and a table of the updated database is displayed.

* When they choose to view employees by manager, they are presented with a formatted table showing employees and managers they report to.

* When they choose to view employees by department, they are presented with a formatted table showing employees and departments they are in.

* When they choose to delete department, roles and employees, they are prompted to select whether they want to delete a department, role, employee or none, and this information is updated in the database, and a table of the updated database is displayed.

* When they choose to View total utilized budget by department, they are presented with a formatted table showing departments in the company and the budget used per department.

## Installation

Run $ npm install  to install inquirer, console.table and mysql2.


## Screenshots

![App Image](/assets/images/AppImage.png)
> Application


![App Image](/assets/images/SampleTable.png)
> Sample Tables



## Usage 

Run $ node server.js to start the application.


## How to Contribute

1. Clone the repo using $ git clone git@github.com:nenebeji/Employee-Tracker

2. Create a new branch $ git checkout -b your name 

3. Make Changes and test 

4. Submit a pull request with description for review


## Tests

Tests were run using node.


## Questions

Feel free to contact me for further questions via:

Github: https://github.com/nenebeji

Email: nenebeji@gmail.com


## References

Github Repo: https://github.com/nenebeji/Employee-Tracker

### Walkthrough Video

https://drive.google.com/file/d/1PMuuX7vIzlWEBBn1F5VRyiuMDuyN3Nk_/view?usp=sharing


## License

The MIT License

  
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more informaation you can click the link below:

https://opensource.org/licenses/MIT

Copyright (c) 2022 Oritsegidenene Beji.