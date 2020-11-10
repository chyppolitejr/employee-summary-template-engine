// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
  constructor(mgrName, mgrId, mgrEmail, officeNumber) {
    super(mgrName, mgrId, mgrEmail);

    this.officeNumber = officeNumber;
    this.role = "Manager";
  }
  getRole() {
    return this.role;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
