const restify = require('restify')
const DatabaseConnection = require('./Models/db')

DatabaseConnection.connect((err, db) => {
  if (err != null) {
    console.log(err)
    process.exit()
  } else {
    console.log('[DATABASE] connected')
    const server = restify.createServer()
    const port = 3100

    // CORS
    const corsMiddleware = require('restify-cors-middleware')
    const cors = corsMiddleware({
      origins: ['*'],
      allowHeaders: ['Authorization'],
    })
    server.pre(cors.preflight)
    server.use(cors.actual)

    // controllers
    const packages = require('./BusinessLogic/package')

    // read parameter
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser({ mapParams: false }))

    // ============================= package =============================
    server.get('/packages', packages.read)
    server.get('/package', packages.read_by_id)
    server.del('/package', packages.delete_by_id)
    server.post('/package', packages.insert)
    server.put('/package', packages.update_put)
    server.patch('/package', packages.update_patch)

    // listen port
    server.listen(port, () => {
      console.log('[SERVER] running at ' + port)
    })
  }
})
