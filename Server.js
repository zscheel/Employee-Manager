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
        init();
    }
    if (data.choice === 'Add Employee') {
        init();
    }
    if (data.choice === 'Update Employee Role') {
        init();
    }
    if (data.choice === 'View All Roles') {
        init();
    }
    if (data.choice === 'Add Role') {
       init();
    }
    if (data.choice === 'View All Departments') {
       init();
    }
    if (data.choice === 'Add Department') {
        init();
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