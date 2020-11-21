// Class Employee hold the basic properties that all employees have in common e.g. name, id, email, as well as functions to return these informations.
class Employee{
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name
    }

    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return "Employee"
    }
}
// Exports this class to help to build different positions.
module.exports = Employee;