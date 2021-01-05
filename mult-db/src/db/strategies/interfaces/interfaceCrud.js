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

module.exports = Icrud
