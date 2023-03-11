const dbCon = require("./config");
const express = require('express')
const cors = require('cors')
const app = express()

// Connects to the database
dbCon()
const PORT = process.env.PORT 

// Sets cors to allow all origins

app.use(cors())
// Fecilitates the use of JSON
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/trainer', require('./routes/trainer'))

app.get('/', (req, res) => {
  res.send('Welcome to SMMS Backend')
})

app.listen(PORT, () => {
  console.log(`SMMS app listening on port ${PORT}`)
})