// Import the module employee to help to build the manage class.
const Employee = require("./Employee");

// Uses the module Employee to extend with unique properties to the Engineer position, as well as functions.
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        super.getRole();
        return "Engineer";
    }
}
// Creates a module to export and be reused in js files.
module.exports = Engineer;