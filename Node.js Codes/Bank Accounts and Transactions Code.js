//This terminal code is similar to To Do List Code.But now this code uses a object instead of an array
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = path.join(__dirname, 'Accounts.json'); // File where user accounts will be saved

// Function to load accounts from the object `accounts` to the .json file
function LoadAccounts() {
    let Accounts = {}; // Initialize the object inside the LoadAccounts function

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        try {
            return JSON.parse(data); // Attempt to parse the JSON
        } 
        catch (error) {
            console.log("Error loading tasks: Invalid JSON. Initializing as empty.");
            return {}; // If the JSON is corrupted, initialize as empty
        }
    } 
    else {
        fs.writeFileSync(filePath, JSON.stringify(Accounts, null, 2), 'utf-8'); // Create an empty .json file if the previous one is problematic or doesn't exist
        return {};
    }
}

// Save user accounts to the .json file
function SaveAccounts() {
    fs.writeFileSync(filePath, JSON.stringify(Accounts, null, 2), 'utf-8');
}

let Accounts = LoadAccounts(); // Transfer the accounts object to the LoadAccounts function to be stored in the .json file

console.log("Hello, welcome to this banking transaction program.");
Menu();

function Menu() {
    console.log("Do you want to create a new account or access an existing account?");
    rl.question(`Type CREATE to create a new bank account, ACCESS to log into an existing one, MENU for the program menu, or EXIT to leave the program: `, (response) => {

        if (response.toLocaleLowerCase() === "create") {
            CreateAccounts();
        }
        else if (response.toLocaleLowerCase() === "access") {
            ManageAccounts();
        }
        else if (response.toLocaleLowerCase() === "exit") {
            Exit();
        }
        else if (response.toLocaleLowerCase() === "menu") {
            SecondaryMenu();
        }
        else {
            console.log("Error! The input response is invalid. Please try again.");
            Menu();
        }
    });
}

// Function to verify if the account name being created contains special characters
function HasSpecialCharacters(accountName) {
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharactersRegex.test(accountName); 
}

function CreateAccounts() {
    rl.question(`Enter the name of the bank account you are creating: `, (accountName) => {
        accountName = accountName.trim(); // Use trim to ignore excess spaces in the account name
        if (HasSpecialCharacters(accountName) || accountName.length < 8) {
            console.log("Error! The bank account name must contain only letters and numbers and must not be less than 8 characters.");
            CreateAccounts();
        }
        else if (Accounts[accountName]) {
            console.log(`The account ${accountName} already exists. Please choose a different name.`);
            CreateAccounts();
        }
        else {
            SetPassword(accountName);
        }
    });
}

function SetPassword(accountName) {
    rl.question(`Now create a password for the account with at least 6 characters: `, (accountPassword) => {
        if (accountPassword.length < 6) {
            console.log("Error! The account password must have at least 6 characters. Please create a new password.");
            SetPassword(accountName);
        }
        else {
            // Save the account name and password in the Accounts object
            Accounts[accountName] = { password: accountPassword, balance: 0 }; // Set the default password and initial balance to avoid issues
            SaveAccounts(); // Save the newly created account's data
            console.log(`Account ${accountName} created successfully.`);
            NextStep(accountName);
        }
    });
}

function NextStep(accountName) {
    console.log("Do you want to deposit money into your account now or go to the program menu?");
    rl.question(`Type 1 to deposit money or 2 to go to the menu: `, (option) => {
        option = Number(option); 
        switch (option) {
            case 1:
                ManageAccounts(accountName);
                break;

            case 2:
                SecondaryMenu();
                break;

            default:
                console.log("Error! The option entered is invalid. Please try again.");
                NextStep(accountName);
                break;
        }
    });
}

function SecondaryMenu() {
    console.log("What would you like to do now?");
    rl.question(`
Type 1 to deposit or withdraw money from your account
Type 2 to return to the start
Type 3 to remove an account from the program
Type 4 to exit the program: `, (option) => {
        option = Number(option);
        switch (option) {
            case 1:
                console.log("Welcome to the account management area.");
                ManageAccounts();
                break;

            case 2:
                Menu();
                break;

            case 3:
                RemoveAccount();
                break;

            case 4:
                Exit();
                break;

            default:
                console.log("Error! The selected option does not exist at this time. Please try again.");
                SecondaryMenu();
                break;
        }
    });
}

function ManageAccounts() {
    console.log(`Existing accounts in the banking program: `, Object.keys(Accounts)); // Object.keys returns the elements of the object as an array 
    rl.question(`Enter the name of your account: `, (accountName) => {
        accountName = accountName.trim(); // Use trim to ignore excess spaces in the account name
        if (Accounts[accountName]) {
            rl.question(`Enter the password for the account ${accountName}: `, (accountPassword) => {
                if (Accounts[accountName].password === accountPassword) {
                    DepositOrWithdraw(accountName);
                }
                else {
                    console.log("Error! The password entered for the account is incorrect. Please try again.");
                    ManageAccounts(accountName);
                }
            });
        }
        else {
            console.log(`The account ${accountName} does not exist in the program. Please try entering the name again.`);
            ManageAccounts(accountName);
        }
    });
}

function DepositOrWithdraw(accountName) {
    rl.question("Do you want to deposit or withdraw money from your account? (type 1 for DEPOSIT or 2 for WITHDRAW): ", (option) => {
        option = Number(option);
        switch (option) {
            case 1:
                console.log(`The current balance of the account ${accountName} is $${Accounts[accountName].balance.toFixed(2)}`);
                rl.question(`Enter the amount you want to deposit into your account: `, (deposit) => {
                    deposit = parseFloat(deposit);
                    if (deposit > 0) {
                        Accounts[accountName].balance += deposit;
                        SaveAccounts();
                        console.log(`Deposit of $${deposit.toFixed(2)} successfully made to the account ${accountName}.`);
                        console.log(`The current balance of the account ${accountName} is $${Accounts[accountName].balance.toFixed(2)}`);
                        SecondaryMenu();
                    }
                    else if (isNaN(deposit)) {
                        console.log("Error! Please make a valid deposit with a number, not letters!");
                        DepositOrWithdraw(accountName);
                    }
                    else {
                        console.log(`Error! $${deposit.toFixed(2)} is not a valid amount to deposit!`);
                        DepositOrWithdraw(accountName);
                    }
                });
                break;

            case 2:
                WithdrawMoney(accountName);
                break;

            default:
                console.log("Error! Invalid option selected. Please try again.");
                DepositOrWithdraw(accountName);
                break;
        }
    });
}

function RemoveAccount() {
    console.log(`Existing accounts: `, Object.keys(Accounts));
    rl.question(`Enter the name of the account to remove: `, (accountToRemove) => {
        if (Accounts[accountToRemove]) {
            rl.question(`Enter the password for the account ${accountToRemove}: `, (accountPassword) => {
                if (Accounts[accountToRemove].password === accountPassword) {
                    delete Accounts[accountToRemove];
                    SaveAccounts();
                    console.log(`Account ${accountToRemove} successfully removed.`);
                    SecondaryMenu();
                }
                else {
                    console.log("Incorrect password entered! Try again.");
                    RemoveAccount();
                }
            });
        }
        else {
            console.log(`Error! The account ${accountToRemove} does not exist.`);
            RemoveAccount();
        }
    });
}

function Exit() {
    console.log("Program exited.");
    rl.close();
}
