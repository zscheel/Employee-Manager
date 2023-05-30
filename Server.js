const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'zach2002',
    database: 'employee_db'
});

const startQuestions = [
    {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
]

function responseHandler(data) {
    if (data.choice === 'View All Employees') {
        const sql = `SELECT first_name, last_name, role.title as role
        FROM employee n
        LEFT JOIN role ON n.role_id = role.id;
        `
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log('');
            console.table(rows);
        })
        init();
    }
    if (data.choice === 'Add Employee') {
        init();
    }
    if (data.choice === 'Update Employee Role') {
        init();
    }
    if (data.choice === 'View All Roles') {
        const sql = `SELECT title, department.name AS department, salary 
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id;`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log('');
            console.table(rows);
        })
        init();
    }
    if (data.choice === 'Add Role') {
       init();
    }
    if (data.choice === 'View All Departments') {
        const sql = 'SELECT name FROM department';
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
            }
            console.log('');
            console.table(rows); 
        });
        init();
    }
    if (data.choice === 'Add Department') {
        inquirer.prompt(depQuestion).then(data => {
            const name = data.depName;
            const sql = `INSERT INTO department(name)
            VALUES(?)`;

            const params = [name]

            db.query(sql, params, (err, row) => {
                if (err) {
                    console.log(err);
                }
                console.log('');
                console.table(row);
                init();
            });
        });
    }
    if (data.choice === 'Quit') {
        console.log('GoodBye');
        process.exit(0);
    }
}


function init() {
    inquirer.prompt(startQuestions).then(data => {
        responseHandler(data);
    });
}

init();