const Mongoose = require('mongoose')
const ICrud = require('./../db/strategies/interfaces/interfaceCrud')
const credential = require('./../config')

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
    return state
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
  }

  defineModel() {
    heroSchema = new Mongoose.Schema({
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

  async create(item) {
    const registerResult = await model.create({
      name: 'Batman',
      power: 'Money'
    })
  }
}

module.exports = MongoDB