const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super()
    this.db = db
  }

  list() {
    return {
      path: '/hero',
      method: 'GET',
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query
          let query = {}
          if (name) {
            query.name = name
          }

          if (skip && isNaN(skip)) {
            throw Error('The skip type is incorrect')
          }

          if (limit && isNaN(limit)) {
            throw Error('The limit type is incorrect')
          }

          return this.db.read(query, +skip, +limit)
        } catch (error) {
          console.error(error)
          return new Error('Internal Server Error')
        }
      }
    }
  }
}

module.exports = HeroRoutes