const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var winston = require('winston')
const morgan = require('morgan')

const bodyParser = require('body-parser');
const app = express()
// app.use(morgan('combined'))
app.use(helmet())
app.use(bodyParser.json())
app.use(cors()) // Important for security and access control

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  winston.log(userInput);
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))