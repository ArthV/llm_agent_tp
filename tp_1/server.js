const express = require('express');
const cors = require('cors')

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


const app = express();

app.listen(8080, () => {console.log('Serveur à l\'écoute')});


app.get('/gpt/', cors(corsOptions), (req, res) => {

    // Send the response to the client
    res.send({
      message: "user found",
    });
  });