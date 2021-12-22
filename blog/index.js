const config = require('./utils/config')
const http = require('http')
const server = require('./app')
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
