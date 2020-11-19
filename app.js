const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employee = [];

class TeamBuilder {
    
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
                },
                {
                    type: "input",
                    message: "What is your Manager's office number?",
                    name: "managerOfficeNumber",
                },
                
            ])
            .then(res => {
                const newManager = new Manager(res.managerName, res.managerId, res.managerEmail, res.managerOfficeNumber);

                employee.push(newManager);

                this.newTeamMember();
            })
        }

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
                if (res.newTeamMember === "Engineer"){
                    this.newEngineer();
                }
                else if (res.newTeamMember === "Intern"){
                    this.newInter();
                }
                else {
                    this.end();
                }
            })
    }

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
                },
                {
                    type: "input",
                    message: "What is your Engineer's GitHub username?",
                    name: "engineerGitHub",
                },
            ])
            .then(res =>{
                const newEngineer = new Engineer (res.engineerName, res.engineerId, res.engineerEmail, res.engineerGitHub);

                employee.push(newEngineer);

                this.newTeamMember();
            })
    }

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
                },
                {
                    type: "input",
                    message: "What is your Intern's school name?",
                    name: "interSchoolName",
                },
            ])
            .then(res =>{
                const newInter = new Intern(res.internName, res.interId, res.interEmail, res.interSchoolName);

                employee.push(newInter);

                this.newTeamMember();
            })
    }

    end(){
                
        const newHtml = render(employee);

        fs.writeFile(outputPath, newHtml, err => err ? console.log(err) : console.log("Your team profile page has been created."));
    }
}

const teamBuilder = new TeamBuilder();
teamBuilder.buildManager();

