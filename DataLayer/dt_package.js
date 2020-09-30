const DB = require('../Models/db')
const db = DB.getConnection()

const dt = {
  read_all_dt: (callback) => {
    db.collection('package')
      .find({})
      .toArray((err, docs) => {
        return callback(docs)
      })
  },

  read_by_id_dt: (data, callback) => {
    db.collection('package')
      .find({ id: parseInt(data.id) })
      .toArray((err, docs) => {
        return callback(docs)
      })
  },
  delete_dt: (data, callback) => {
    db.collection('package').deleteOne(
      {
        id: parseInt(data.id),
      },
      (err, doc) => {
        return callback(doc.result, err)
      }
    )
  },
  insert_dt: (data, callback) => {
    db.collection('package').insertOne(data, function (err, res) {
      if (err) throw err
      return callback({ err: err, res: res })
    })
  },

  delete_update_dt: (role) => {
    db.collection('m_menu_access').updateMany(
      { m_role_id: role },
      {
        $set: {
          is_delete: 1,
        },
      }
    )
  },

  update_dt: (id, data, callback) => {
    const filter = { id: id }
    const update = { $set: data }
    db.collection('package').updateOne(filter, update, function (err, res) {
      if (err) throw err

      return callback({ err: err, res: res })
    })
  },
}
module.exports = dt
