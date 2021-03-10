const express = require('express')
const app = express()

const api = require('./routes/api.routes')
import config from './config'

app.use('/api', api);
app.use('/', api)

const PORT = config.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})
