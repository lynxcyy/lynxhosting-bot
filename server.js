const axios = require('axios')
const chalk = require('chalk')
const express = require('express')
const app = express()
const http = require('http')
const PORT = process.env.PORT || 8800
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
let i = 0

const runServer = async () => {
   app.get('/', (req, res) => res.send('Server Active!'))
   const server = http.createServer(app)
   server.listen(PORT, () => console.log(chalk.yellowBright.bold('Connected to server --', PORT)))
   while (true) {
      i++
      try {
         let response = await axios(global.replit_url || 'https://google.com')
         if (global.replit_url) console.log(chalk.yellowBright.bold('Server wake-up! --', response.status))
         await sleep(30_000)
      } catch { }
   }
}

runServer().then(() => runServer())