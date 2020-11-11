const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array to hold answer for later use in html
let employeeArray = [];

// check if output folder exists if not create it
if (fs.existsSync(OUTPUT_DIR) === false) {
  fs.mkdir(OUTPUT_DIR, (err) => {
    if (err) throw err;
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const promptUser = () =>
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: "What Type of Employee Would You Like To Enter?",
        choices: ["Intern", "Engineer", "Manager"],
      },
      {
        type: "input",
        name: "employeeName",
        message: "What is the Employee's Full Name",
      },
      {
        type: "number",
        name: "employeeId",
        message: "What is the Employee's Id Number",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is the Employee's Email Address?",
      },
      {
        type: "input",
        name: "employeeSchool",
        message: "What School Does the Intern Attend?",
        when: (answers) => answers.employeeType === "Intern",
      },
      {
        type: "input",
        name: "employeeOffice",
        message: "What Office Number is this Manager Assigned to?",
        when: (answers) => answers.employeeType === "Manager",
      },
      {
        type: "input",
        name: "employeeGithub",
        message: "What is the Github name of the Engineer?",
        when: (answers) => answers.employeeType === "Engineer",
      },
    ])
    .then((answers) => {
      // addToArray(answers);
      employeeArray.push(answers);
      promptContinue().catch((err) => console.error(err));
    });

// function to prompt users if they want to continue adding team members
const promptContinue = () =>
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addMoreMembers",
        message: "Would you like to add more team members?",
      },
    ])
    .then((data) => {
      if (data.addMoreMembers === true) {
        promptUser();
      } else {
        console.log(data.addMoreMembers);
        console.log("Your are done adding team members");
        //console.log(JSON.stringify(employeeType));
        fs.writeFile(outputPath, render(employeeArray), (err) =>
          err ? console.error(err) : console.log("file successfully written")
        );
      }
    });

//   .then((response) => {
//     console.log(JSON.stringify(response));
//   });

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

promptUser().catch((err) => console.error(err));
