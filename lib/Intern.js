// Import the module employee to help to build the manage class.
const Employee = require("./Employee");

// Uses the module Employee to extend with unique properties to the intern position, as well as functions.
class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }

    getSchool(){
        return this.school;
    }

    getRole(){
        super.getRole();
        return "Intern";
    }
}
// Creates a module to export and be reused in js files.
module.exports = Intern;