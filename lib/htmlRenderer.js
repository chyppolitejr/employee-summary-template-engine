const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = (employees) => {
  console.log(employees);

  const html = [];

  html.push(
    ...employees
      .filter((employee) => employee.employeeType === "Manager")
      .map((manager) => renderManager(manager))
  );
  html.push(
    ...employees
      .filter((employee) => employee.employeeType === "Engineer")
      .map((engineer) => renderEngineer(engineer))
  );
  html.push(
    ...employees
      .filter((employee) => employee.employeeType === "Intern")
      .map((intern) => renderIntern(intern))
  );

  return renderMain(html.join(""));
};

const renderManager = (manager) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "manager.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", manager.employeeName);
  template = replacePlaceholders(template, "role", manager.employeeType);
  template = replacePlaceholders(template, "email", manager.employeeEmail);
  template = replacePlaceholders(template, "id", manager.employeeId);
  template = replacePlaceholders(
    template,
    "officeNumber",
    manager.getOfficeNumber()
  );
  return template;
};

const renderEngineer = (engineer) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "engineer.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", engineer.employeeName);
  template = replacePlaceholders(template, "role", engineer.employeeType);
  template = replacePlaceholders(template, "email", engineer.employeeEmail);
  template = replacePlaceholders(template, "id", engineer.employeeId);
  template = replacePlaceholders(template, "github", engineer.employeeGithub);
  return template;
};

const renderIntern = (intern) => {
  let template = fs.readFileSync(
    path.resolve(templatesDir, "intern.html"),
    "utf8"
  );
  template = replacePlaceholders(template, "name", intern.employeeName);
  template = replacePlaceholders(template, "role", intern.employeeType);
  template = replacePlaceholders(template, "email", intern.employeeEmail);
  template = replacePlaceholders(template, "id", intern.employeeId);
  template = replacePlaceholders(template, "school", intern.employeeSchool);
  return template;
};

const renderMain = (html) => {
  const template = fs.readFileSync(
    path.resolve(templatesDir, "main.html"),
    "utf8"
  );
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
