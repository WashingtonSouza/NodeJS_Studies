class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception')
  }
}

class Icrud {
  create(item) {
    throw new NotImplementedException()
  }

  ready(query) {
    throw new NotImplementedException()
  }

  update(id, item) {
    throw new NotImplementedException()
  }

  delete(id, item) {
    throw new NotImplementedException()
  }
}

class MongoDB extends Icrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('The item was saved in MongoDB')
  }
}

class PostgresDB extends Icrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('The item was save in Postgres')
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy
  }

  create(item) {
    return this._database.create(item)
  }

  read(item) {
    return this._database.read(item)
  }

  update(id, item) {
    return this._database.update(id, item)
  }

  delete(id) {
    return this._database.delete(id)
  }
}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new PostgresDB())
contextPostgres.create()
