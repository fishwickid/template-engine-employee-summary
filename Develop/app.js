const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//Initial questions about the employee

const employeeFirstQuestion = [
    {
        type: "list",
        message: "What is the role of this employee?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }
]

//Questions asked when making a manager profile
const managerQuestions = [
    {
        type: "input",
        message: "What is the manager's name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the manager's ID?",
        name: "managerId"
    },
    {
        type: "input",
        message: "What is the manager's email?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is the employee's office number?",
        name: "managerOfficeNumber"
    }
]

//Questions asked when making an engineer profile
const engineerQuestions = [
    {
        type: "input",
        message: "Enter the Engineer's name: ",
        name: "engineerName"
    },
    {
        type: "input",
        message: "Enter the Engineer's ID number: ",
        name: "engineerId"
    },
    {
        type: "input",
        message: "Enter the Engineer's E-mail address: ",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "Enter your Github Account: ",
        name: "engineerGithub"
    }
]

//Questions asked when making an intern profile
const internQuestions = [
    {
        type: "input",
        message: "Enter the intern's name: ",
        name: "internName"
    },
    {
        type: "input",
        message: "Enter the intern's ID number: ",
        name: "internId"
    },
    {
        type: "input",
        message: "Enter the intern's E-mail address: ",
        name: "internEmail"
    },
    {
        type: "input",
        message: "Enter your School: ",
        name: "internSchool"
    }
]

//Questions asked to see if the user wants to add a new employee profile
const newEmployee = [
    {
        type: "list",
        message: "Do you wish to add another employee?",
        choices: ["Yes", "No"],
        name: "new"
    }
]

// Emppty array of employees to start off with
const arrayOfEmployees = []


// Initiation function which starts the questions
function init() {
    inquirer.prompt(employeeFirstQuestion).then(function (response) {
       
       
       // initiate switch statement based on the employees role response. This will determine what questions they will be asked pulling
       // from Employee class... then the extentions of that which are the manager, engineer and intern constructors
        switch (response.role) {
            case "Manager":
                inquirer.prompt(managerQuestions).then(function (response) {
                    const newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOfficeNumber)
                    arrayOfEmployees.push(newManager);
                    console.log(arrayOfEmployees);
                    inputNewEmployee();
                });
                break;
            case "Engineer":
                inquirer.prompt(engineerQuestions).then(function (response) {
                    const newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub)
                    arrayOfEmployees.push(newEngineer);
                    console.log(arrayOfEmployees);
                    inputNewEmployee();
                });
                break;
            case "Intern":
                inquirer.prompt(internQuestions).then(function (response) {
                    const newIntern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool)
                    arrayOfEmployees.push(newIntern);
                    console.log(arrayOfEmployees);
                    inputNewEmployee();
                });
                break
        }
    });
}

// Once the user has filled out an employee this function will ask if they want to add another or finish their inputting. 
// If the chose to finish, the html will be rendered in the output file of the application and ready to be viewed.
function inputNewEmployee() {
    inquirer.prompt(newEmployee).then(function (response) {
        switch (response.new) {
            case "Yes":
                init();
                break;
            case "No":
                const htmlReturnedFromRender = render(arrayOfEmployees);
                console.log(outputPath)
                fs.writeFile(`${outputPath}`, htmlReturnedFromRender, function(err) {
                    if (err) {
                      return console.log(err);
                    }});
                break;
        }
    });
}
init();
