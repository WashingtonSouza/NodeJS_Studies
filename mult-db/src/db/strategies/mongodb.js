const Mongoose = require('mongoose')
const ICrud = require('./interfaces/interfaceCrud')
const { credential } = require('./../../config')

const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor() {
    super()

    this._heroes = null
    this._drive = null
  }

  async isConnected() {
    const state = STATUS[this._drive.readyState]
    if (state === 'Connected') return state

    if (state !== 'Connecting') return state

    await new Promise(resolve => setTimeout(resolve, 1000))
    return STATUS[this._drive.readyState]
  }

  connect() {
    const connectInfo = `mongodb://${credential.mongoUser}:${credential.mongoPassword}@localhost:27017/heroes`
    Mongoose.connect(connectInfo, { useNewUrlParser: true }, function (error) {
      if (!error) return
      console.log('Connection fail ', error)
    })

    const connection = Mongoose.connection
    connection.once('open', () => console.log('Database running'))
    this._drive = connection
    this.defineModel()
  }

  defineModel() {
    const heroSchema = new Mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      power: {
        type: String,
        required: true
      },
      insertedAt: {
        type: Date,
        default: new Date()
      }
    })

    this._heroes = Mongoose.model('heroes', heroSchema)
  }

  create(item) {
    return this._heroes.create(item)
  }

  read(item, skip = 0, limit = 10) {
    return this._heroes.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    return this._heroes.updateOne({ _id: id }, { $set: item })
  }
}

module.exports = MongoDB