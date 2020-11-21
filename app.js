// Imports all modules that are going to be used in this app.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Creates a variable to hold the path where the new file will be saved.
const OUTPUT_DIR = path.resolve(__dirname, "output");
// Joins the path and the file name to be used in the new file creation.
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Grabs the function that will be used to render the employees profile.
const render = require("./lib/htmlRenderer");

// Global variable that will hold the new employees objects array to be used by the render function to render the new employees profile. 
const employee = [];

// Class that holds the functions to build a new team profile.
class TeamBuilder {
    
    // Start function that will grab the Manager information by inquirer prompts.
    buildManager() {
        console.log("Please build your team.");
        return inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your Manager's name?",
                    name: "managerName",
                },
                {
                    type: "input",
                    message: "What is your Manager's id?",
                    name: "managerId",
                },
                {
                    type: "input",
                    message: "What is your Manager's email?",
                    name: "managerEmail",
                    validate: email => {
                        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                        if(re) {
                            return true;
                        }
                        else{
                            return "You have entered an invalid email address."
                        } 
                    },
                },
                {
                    type: "input",
                    message: "What is your Manager's office number?",
                    name: "managerOfficeNumber",
                },
                
            ])
            .then(res => {
                // Build a new object with the promise from the inquirer.
                const newManager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOfficeNumber);
                
                // Push the new object to the employee array.
                employee.push(newManager);
                
                // Call function newTeamMember to check what kind of team members will be added.
                this.newTeamMember();
            })
        }
    // This function uses inquirer to ask the user which new member he or she would like to add or if has completed to finish to build his or her team.
    newTeamMember() {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Which type of team member would you like to add?",
                    name: "newTeamMember",
                    choices: ["Engineer", "Intern", "I do not want to add any more team members."],
                },
            ])
            .then(res => {
                // If user selected Engineer calls function to build new Engineer profile.
                if (res.newTeamMember === "Engineer"){
                    this.newEngineer();
                }
                // If user selected intern calls function to build new intern profile.
                else if (res.newTeamMember === "Intern"){
                    this.newInter();
                }
                // If the user decided to not enter more members to the team the end function is called to render the profiles and create a new file.
                else {
                    this.end();
                }
            })
    }
    // Start function that will grab the Engineer information by inquirer prompts.
    newEngineer(){
        return inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your Engineer's name?",
                    name: "engineerName",
                },
                {
                    type: "input",
                    message: "What is your Engineer's id?",
                    name: "engineerId",
                },
                {
                    type: "input",
                    message: "What is your Engineer's email?",
                    name: "engineerEmail",
                    validate: email => {
                        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                        if(re) {
                            return true;
                        }
                        else{
                            return "You have entered an invalid email address."
                        } 
                    },
                },
                {
                    type: "input",
                    message: "What is your Engineer's GitHub username?",
                    name: "engineerGitHub",
                },
            ])
            .then(res =>{
                // Build a new object with the promise from the inquirer.
                const newEngineer = new Engineer (res.engineerName, res.engineerId, res.engineerEmail, res.engineerGitHub);
                
                // Push the new object to the employee array.
                employee.push(newEngineer);

                // Call function newTeamMember to check what kind of team members will be added.
                this.newTeamMember();
            })
    }
    // Start function that will grab the Engineer information by inquirer prompts.
    newInter(){
        return inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your Intern's name?",
                    name: "interName",
                },
                {
                    type: "input",
                    message: "What is your Intern's id?",
                    name: "interId",
                },
                {
                    type: "input",
                    message: "What is your Intern's email?",
                    name: "interEmail",
                    validate: email => {
                        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
                        if(re) {
                            return true;
                        }
                        else{
                            return "You have entered an invalid email address."
                        } 
                    },
                },
                {
                    type: "input",
                    message: "What is your Intern's school name?",
                    name: "interSchoolName",
                },
            ])
            .then(res =>{
                // Build a new object with the promise from the inquirer.
                const newInter = new Intern(res.internName, res.interId, res.interEmail, res.interSchoolName);
                
                // Push the new object to the employee array.
                employee.push(newInter);
                
                // Call function newTeamMember to check what kind of team members will be added.
                this.newTeamMember();
            })
    }
    
    // end function is called when user does not want to enter new members to the team.
    end(){
        // Variable that holds the new rendered html file with the employees profile.        
        const newHtml = render(employee);

        // Uses variable outputPath to give a path and a name to the new file, and variable newHtml to be the content to the new written file by 'fs' module.
        fs.writeFile(outputPath, newHtml, err => err ? console.log(err) : console.log("Your team profile page has been created."));
    }
}

// Variable to hold the new TeamBuilder class.
const teamBuilder = new TeamBuilder();
// Call the function buildManager inside the class TeamBuilder.
teamBuilder.buildManager();

