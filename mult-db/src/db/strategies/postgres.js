const ICrud = require('./interfaces/interfaceCrud')

class PostgresDB extends ICrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('The item was save in Postgres')
  }
}

module.exports = PostgresDB
