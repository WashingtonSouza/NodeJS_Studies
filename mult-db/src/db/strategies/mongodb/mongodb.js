const Mongoose = require('mongoose')
const ICrud = require('../../strategies/interfaces/interfaceCrud')
const { credential } = require('../../../config')

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super()

    this._schema = schema
    this._connection = connection
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if (state === 'Connected') return state

    if (state !== 'Connecting') return state

    await new Promise(resolve => setTimeout(resolve, 1000))
    return STATUS[this._connection.readyState]
  }

  static connect() {
    const connectInfo = `mongodb://${credential.mongoUser}:${credential.mongoPassword}@localhost:27017/heroes`
    Mongoose.connect(connectInfo, { useNewUrlParser: true }, function (error) {
      if (!error) return
      console.log('Connection fail ', error)
    })

    const connection = Mongoose.connection
    connection.once('open', () => console.log('Database running'))
    return connection
  }

  create(item) {
    return this._schema.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item })
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id })
  }
}

module.exports = MongoDB