const express = require('express');
const cors = require('cors')

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "TOBECOMPLETED", // This is the default and can be omitted
});

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
    const tools = [
        {
          "type": "function",
          "function": {
            "name": "en_avant",
            "description": "incrementer  sur l'axe j de 1 case ",
            "parameters": {
              "type": "object",
              "properties": {
              },
            }
        }
    },
    {
      "type": "function",
      "function": {
        "name": "en_dessous",
        "description": "incrementer sur l'axe i de 1 case ",
        "parameters": {
          "type": "object",
          "properties": {
          },
        }
    }
},
{
  "type": "function",
  "function": {
    "name": "au_dessus",
    "description": "decrementer  sur l'axe i de 1 case ",
    "parameters": {
      "type": "object",
      "properties": {
      },
    }
}
},

{
  "type": "function",
  "function": {
    "name": "en_arriere",
    "description": "decrementer  sur l'axe j de 1 case ",
    "parameters": {
      "type": "object",
      "properties": {
      },
    }
}
},

]
    
    // todo : add openAI call here
    const chatCompletion = openai.chat.completions.create({
        messages: [
            { role: 'user', content: `
            sur une grille avec les colones j de 0 à 9 et les lignes i de 0 à 1.
            Poule en 0,0 et Renard en 1,9.
            les cordonnées sont exprimées en (i,j).
            le but est que la poule aille sur la position du renard.
            en utilisant les fonctions données, choisi la prochaine action.
            `}, {role: "assistant", content: "en_avant",
        {role: "user", content: "nouvelle position (0,1), le renard n'est pas attrape, quelle est la prochaine action?"},}
        ],
        model: 'gpt-3.5-turbo',
        tools: tools,
      }).then((response) => {
        const returns = response.choices[0].message.tool_calls.map((tool_call)=> {
         return tool_call.function
        })
        res.send({
            message: returns,
          });
        });
  
    // Send the response to the client

  });