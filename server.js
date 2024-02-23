require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

console.log('host:', process.env.DB_USER) 
console.log('host:', process.env.DB_PASSWORD)
    // Create a connection to the MySQL database
    const db = mysql.createConnection({
      host: 'localhost',  
     
      // port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'department_db'
    });
    
    // Attempt to connect to the database
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err);
        return;
      }
      console.log('Connected to the department_db database.');
    });
    
  
  


function init() {
  inquirer.prompt([
     {
         // this displays a menu for the users to choose which action they want to take
         type: 'list',
         name: 'item',
         message: 'Select an item:',
         choices: ['view all departments', 'view all roles', 
         'view all employees', 
         'add a department', 'add a role', 
         'add an employee', 'update an employee', 'exit']
       }
     ]).then((answers) => {

 if (answers.item === 'view all departments') { 
     
     console.log('viewing departments')
     viewDepartments();
 } 

 if (answers.item === 'view all roles') { 
     
     console.log('viewing roles')
     viewRoles();
 }  

 if (answers.item === 'view all employees') { 
    
     console.log('viewing employees')
     viewEmployees();
 }  

 if (answers.item === 'add a department') { 
    
     console.log('add departments')
     addDepartments();
 }  

 if (answers.item === 'add a role') { 
     
     console.log('add roles')
     addRoles();
 }  

 if (answers.item === 'add an employee') { 
     
     console.log('add employees')
     addEmployees();
 }  

 if (answers.item === 'update an employee') { 
     
     console.log('update Employees')
     updateEmployees();
 }  

 if (answers.item === 'exit') { 
     
     console.log('bye')
     process.exit(); 
 }  

 })
 .catch((error) => {
     console.error('An error occurred:', error);
 })
} 


  function viewDepartments() {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('viewing departments!!!!@##$')
      console.log(rows);

      console.table(rows);
        init();
    }
    );
    } 

    function viewRoles() {
      const sql = `SELECT department.department_name AS department, role.title, role.salary FROM role JOIN department ON role.department_id = department.id`; 
      console.log('bob sagget!!!')
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(rows);
          init();
      }
      );
    }

    function viewEmployees() { 
      console.log('viewing employees2') 
      const sql = `SELECT employees.first_name, employees.last_name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id`;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
          return;
        }
        console.table(rows);
          init();
      }
      );
    }

    function addDepartments() {
      console.log('add departments') 
      inquirer.prompt([
        {
          type: 'input',
          name: 'department_name',
          message: 'Enter the name of the department'
        }
      ]).then((answers) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [answers.department_name];
        
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Department added');
          init();
        });
      });
    } 

    function addRoles() { 
      const departmentChoices = []; 
      let departments 
      db.query(`SELECT * FROM department`, (err, rows) => { 
        if (err) { 
          console.log(err); 
          return; 
        } 

        departments = rows; 
        console.log('departments:', departments);
        for (let i = 0; i < rows.length; i++) { 
          departmentChoices.push(rows[i].department_name); 
        } 
       // console.log(departmentChoices);
      }); 

            console.log('checking depts', departments)
      console.log('add roles') 
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the name of the role'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'choose the department', 
          choices: departmentChoices
        }
      ]).then((answers) => { 
       // const department = answers.department_id.find(row => row.department_name === answers.department_id);
          let departmentId;  

              departments.forEach((department) => { 
                console.log('department:', department); 
                console.log('reading depts', departments);

                if (department.department_name === answers.department_id) { 
                  departmentId = department.id; 
                } 
              });
       // if (department) {
         //   const departmentId = department.id;
         //   console.log('Department ID:', departmentId);
       // } else {
         //   console.log('Department not found.');
        //}
      

      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answers.title, answers.salary, departmentId];
      
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Role added');
        init();
      });
      });
    } // Add closing parenthesis and semicolon here

    function addEmployees() {
      const roleChoices = []; 
      const managerChoices = [];
      
      let managers;
      let roles;
      db.query(`SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, rows) => {
        if (err) {
          console.log(err);
          return;
      }
      managers = rows;
      console.log('manager:', rows[0].manager);
      console.log('managers:', managers);
      for (let i = 0; i < rows.length; i++) {
        managerChoices.push(rows[i].manager);
      }
      });
    console.log(roleChoices, managerChoices, 'role and manager choices');
    console.log('managerChoices:', managerChoices);

      db.query(`SELECT * FROM role`, (err, rows) => { 
        if (err) { 
          console.log(err); 
          return; 
        } 

        roles = rows; 
        for (let i = 0; i < rows.length; i++) { 
          roleChoices.push(rows[i].title); 
        } 
       // console.log(departmentChoices);
      });  
      console.log('add employees')
       inquirer.prompt([ 
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee'
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'choose the role',
          choices: roleChoices
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'choose the manager',
          choices: managerChoices
        }
      ]).then((answers) => { 
        let roleId;
        let managerId;
        managers.forEach((manager) => { 

          console.log('manager:', manager.manager); 
          console.log('answers:', answers.manager_id);
          if (manager.name === answers.manager_id) {
            managerId = manager.id; 
            console.log('managerId:', managerId);
          }
        });
        roles.forEach((role) => {
          if (role.title === answers.role_id) {
            roleId = role.id;
          }
        });
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answers.first_name, answers.last_name, roleId, managerId];
        
        db.query(sql, params, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Employee added');
          init();
        });
      });
    }

      function updateEmployees() {
        const employeeChoices = [];
        const roleChoices = [];
        let roles; 
        let employees; 

      db.query(`SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS name, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, rows) => {
        if (err) {
          console.log(err);
          return;
      }
      employees = rows; 


    
    
      for(let i = 0; i < rows.length; i++) { 
        employeeChoices.push(rows[i].name);  
       }
    });
           console.log('employeeChoices:', employeeChoices);
      db.query(`SELECT * FROM role`, (err, rows) => { 
        if (err) { 
          console.log(err); 
          return; 
        } 

        roles = rows; 
        for (let i = 0; i < rows.length; i++) { 
          roleChoices.push(rows[i].title); 
        } 
       // console.log(departmentChoices);
      });  
        inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'which employee do you want to update?', 
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'which role do you want to update the employee to?',
            choices: roleChoices
          }, 
          {
            type: 'list', 
            name: 'manager_id', 
            message: 'which manager do you want to update the employee to?',
            choices: employeeChoices
          }
        ]).then((answers) => {

          let roleId;
        let managerId; 
        let employeeId; 

        employees.forEach((employee) => { 


          if (employee.name === answers.employee_id) {
            employeeId = employee.id;
          }

          if (employee.name === answers.manager_id) {
            managerId = employee.id; 
          }
        });
        roles.forEach((role) => {
          if (role.title === answers.role_id) {
            roleId = role.id;
          }
        });
          const sql = `UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ?`; 
          const params = [roleId, managerId, employeeId]; 
          db.query(sql, params, (err, result) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log('Employee updated');
            init();
          });
        });
      

    }



//   app.post('/api/new-movie', ({ body }, res) => {
//     const sql = `INSERT INTO movies (movie_name)
//       VALUES (?)`;
//     const params = [body.movie_name];
    
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: body
//       });
//     });
//   });



init();


// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database