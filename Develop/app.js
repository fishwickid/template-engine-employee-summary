const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employeeFirstQuestion = [
    {
        type: "list",
        message: "What is the role of this employee?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    }
]
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
const newEmployee = [
    {
        type: "list",
        message: "Do you wish to add another employee?",
        choices: ["Yes", "No"],
        name: "new"
    }
]
const arrayOfEmployees = []
function init() {
    inquirer.prompt(employeeFirstQuestion).then(function (response) {
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
                    const newIntern = new Engineer(response.internName, response.internId, response.internEmail, response.internSchool)
                    arrayOfEmployees.push(newIntern);
                    console.log(arrayOfEmployees);
                    inputNewEmployee();
                });
                break
        }
    });
}
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







// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
