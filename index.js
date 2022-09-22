const viewAllDepartments = () => {
    db.query(`SELECT department.id, department.name AS department_name FROM department`, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.table(results);
        starterPrompt();
    })
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