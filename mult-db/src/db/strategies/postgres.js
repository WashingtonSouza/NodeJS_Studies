const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')
const { user, password } = require('./../../config')

class PostgresDB extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._heroes = null
  }

  async isConnected() {
    try {
      await this._driver.authenticate()
    } catch (error) {
      console.log('Fail!! ', error)
      return false
    }
  }

  async defineModel() {
    this._heroes = this._driver.define('heroes', {
      id: {
        type: Sequelize.INTEGER,
        require: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        require: true
      },
      power: {
        type: Sequelize.STRING,
        require: true
      }
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false
    })

    await this._heroes.sync()
  }

  async connect() {
    this._driver = new Sequelize(
      'heroes',
      user,
      password, {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorAliases: false
    }
    )
    await this.defineModel()
  }

  async create(item) {
    const { dataValues } = await this._heroes.create(item)
    return dataValues
  }
}

module.exports = PostgresDB
