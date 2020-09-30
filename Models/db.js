const MongoClient = require('mongodb').MongoClient
const dbconfig = require('../Configs/db.config.json').local
var conn = null //shared variabel

const DatabaseConnection = {
  connect: (cb) => {
    let url = dbconfig.host + ':' + dbconfig.port + '/' + dbconfig.dbname

    MongoClient.connect(url, (err, db) => {
      if (!err) {
        conn = db.db(dbconfig.dbname)
      }
      cb(err, db)
    })
  },
  getConnection: () => {
    return conn
  },
}
// hekkks
module.exports = DatabaseConnection
