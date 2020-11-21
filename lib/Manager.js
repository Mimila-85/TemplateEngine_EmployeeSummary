// Import the module employee to help to build the manage class.
const Employee = require("./Employee");

// Uses the module Employee to extend with unique properties to the manager position, as well as functions.
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole(){
        super.getRole();
            return "Manager"        
    }
}
// Creates a module to export and be reused in js files.
module.exports = Manager;