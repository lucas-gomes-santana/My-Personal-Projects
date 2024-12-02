// This code stores tasks saved in the "tasks" array into a file called "tasks.json" 
// to persist the tasks even if the user exits VS Code.
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Defining the path to the JSON file where tasks will be stored.
const filePath = path.join(__dirname, 'Tasks.json');

// Loading tasks from the JSON file.
function LoadTasks() {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(data); // Attempt to parse the JSON.
        } catch (error) {
            console.log("Error loading tasks: Invalid JSON. Initializing as empty.");
            return []; // If the JSON is corrupted, initialize as empty.
        }
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]), 'utf-8'); // Create an empty file.
        return [];
    }
}

// Save tasks to the JSON file.
function SaveTasks() {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

// Initialize tasks by loading them from the JSON file.
let tasks = LoadTasks();

Start(); // This function defines where the code execution begins.

function Start() {
    console.log("Hello, welcome to this simple task list program 2.0 made in JavaScript.");
    console.log("This new version comes with several new features compared to the previous program.");
    rl.question(`Would you like to start using the program or exit? 
(Type START to begin, EXIT to close the program, or MENU to go directly to the feature menu)\n`, (response) => {

        if (response.toLowerCase() === "start") {
            DefineTasks();
        } else if (response.toLowerCase() === "menu") {
            Features();
        } else if (response.toLowerCase() === "exit") {
            Quit();
        } else {
            console.log("Error in the program! The entered response is invalid! Please try again.");
            Start();
        }
    });
}

function DefineTasks() {
    rl.question(`Enter a task you want to add to the list: `, (task) => {
        task = task.trim(); // Remove extra spaces.
        if (!isNaN(task)) {
            console.log(`Error! The content ${task} is not considered a valid task. Please enter a valid task.`);
            DefineTasks();
        } else if (tasks.includes(task)) {
            console.log(`The task ${task} is already in the list. Please enter a different task.`);
            DefineTasks();
        } else if (!task) {
            console.log("Error! The task cannot be empty or contain only spaces. Please enter a valid task.");
            DefineTasks();
        } else {
            task = task.toLowerCase();
            tasks.push(task);
            SaveTasks(); // Save the updated list.
            console.log(`The task ${task} has been added to the list.`);
            AddMoreTasks();
        }
    });

    function AddMoreTasks() {
        rl.question(`Would you like to add another task or close the list? 
(Type ADD ANOTHER to add another task or CLOSE to save and exit)\n`, (response) => {
            if (response.toLowerCase() === "add another" || response.toLowerCase() === "addanother") {
                DefineTasks();
            } else if (response.toLowerCase() === "close") {
                console.log("The changes to the list have been saved.");
                AskUser();
            } else {
                console.log("Error! The entered response is invalid. Please try again.");
                AddMoreTasks();
            }
        });
    }
}

function AskUser() {
    console.log("There are some features of this list that can be explored.");
    rl.question(`Would you like to use them or exit the program? 
(Type MENU to go to the features menu or EXIT to quit)\n`, (response) => {
        if (response.toLowerCase() === "menu") {
            Features();
        } else if (response.toLowerCase() === "exit") {
            Quit();
        } else {
            console.log("Error! The entered response is invalid! Please try again.");
            AskUser();
        }
    });
}

function Features() {
    console.log("Welcome to the features menu.");
    rl.question(`
Press 1 to view tasks in the list
Press 2 to remove a task from the list
Press 3 to add tasks to the list
Press 4 to exit the program\n`, (option) => {
        option = parseInt(option);

        switch (option) {
            case 1:
                ViewTasks();
                break;

            case 2:
                RemoveTasks();
                break;

            case 3:
                DefineTasks();
                break;

            case 4:
                Quit();
                break;

            default:
                console.log(`Error! Option ${option} does not exist in the menu. Please choose a valid option.`);
                Features();
                break;
        }
    });
}

function ViewTasks() {
    if (tasks.length === 0) {
        console.log("The task list is empty.");
    }

    console.log("The tasks in the list are:");
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
    }
    UserDecision();

    function UserDecision() {
        rl.question(`Would you like to return to the features menu or exit the program? 
(Type RETURN or EXIT)\n`, (response) => {
            if (response.toLowerCase() === "return") {
                Features();
            } else if (response.toLowerCase() === "exit") {
                Quit();
            } else {
                console.log("Error! The entered response is invalid! Please try again.");
                UserDecision();
            }
        });
    }
}

function RemoveTasks() {
    console.log(`Tasks currently in the list: `, tasks);
    rl.question(`Which of these tasks would you like to remove? 
(Type the task name to remove it)\n`, (taskToRemove) => {

        if (tasks.includes(taskToRemove)) {
            const index = tasks.indexOf(taskToRemove);
            tasks.splice(index, 1);
            SaveTasks(); // Save the updated list.
            console.log(`The task ${taskToRemove} has been removed from the list.`);
            console.log(`Current tasks in the list: `, tasks);
            FurtherRemoval();

            function FurtherRemoval() {
                rl.question(`Would you like to remove another task or return to the features menu? 
(Type REMOVE or RETURN)\n`, (response) => {
                    if (response.toLowerCase() === "remove") {
                        RemoveTasks();
                    } else if (response.toLowerCase() === "return") {
                        Features();
                    } else {
                        console.log("Error! The entered response is invalid! Please try again.");
                        FurtherRemoval();
                    }
                });
            }
        } else if (tasks.length === 0) {
            console.log("The task list is empty, so no tasks can be removed.");
            Features();
        } else {
            console.log(`Error! The task ${taskToRemove} does not exist in the list! Please select a valid task.`);
            RemoveTasks();
        }
    });
}

function Quit() {
    console.log("Program exited.");
    rl.close();
}
