const express = require('express')
const app = express()

const api = require('./routes/api.routes')
require('dotenv').config()

app.use('/api', api);
app.use('/', api)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})
