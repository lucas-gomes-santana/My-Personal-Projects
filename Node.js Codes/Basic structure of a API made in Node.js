//Example of a code that creates a simple API using the express library

//Importing express to write the API code
const express = require('express')
//Creating and initializing the API
const server = express()

//Part of the API that handles the request and response
//The '/message' path should be entered in the top search bar of a browser like Google Chrome. The search key should look like this: localhost:3000 (or any other port defined in the code)/message (or any other keyword defined in the code).
server.get('/message', (req, res) => {
    //Object that generates a message in the API
    return res.json({message: 'Our API is working'})
})

server.get('/user', (req, res) => {
    //Object that generates a message in the API
    return res.json({user: 'Lucas Gomes Santana'})
})

//Creating a port for the API server to be hosted on the web
server.listen(3000, () => { //3000 is the port number where the API server is configured to run. The port number can be any value between 0 and 65535, as long as the port is not in use by another service on your system.
    //Message printed in the terminal indicating that the API is working correctly
    console.log("The server is running") 
})
