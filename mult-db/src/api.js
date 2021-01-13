const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroSchema = require('./db/strategies/mongodb/schemas/herosSchema')
const HeroRoutes = require('./routes/heroRoutes')

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroSchema))

  app.route([
    ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())
  ])

  await app.start()
  console.log('The server is running in the port ', app.info.port)

  return app
}

module.exports = main()