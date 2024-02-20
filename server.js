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
    const sql = `SELECT * FROM departments`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(rows);
        menubar();
    }
    );
    } 

    function viewRoles() {
      console.log('viewing roles')
    }

    function viewEmployees() { 
      console.log('viewing employees')
    }

    function addDepartments() {
      console.log('add departments')
    } 

    function addRoles() {
      console.log('add roles')
    } 

    function addEmployees() {
      console.log('add employees')
    }

    function updateEmployees() {
      console.log('update Employees')
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