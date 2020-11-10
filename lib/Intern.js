// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
function Intern(name, id, emailAddr, school) {
  this.id = id;
  this.name = name;
  this.emailAddr = emailAddr;
  this.school = school;
  this.role = "intern";
  this.getRole = (id) => {
    return "Intern";
  };

  this.getSchool(id) = () => {
    if (this.id === id) {
      return this.school;
    }
  };
}

module.exports = Intern;
