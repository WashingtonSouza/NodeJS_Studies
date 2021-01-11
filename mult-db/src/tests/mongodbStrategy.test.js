const assert = require('assert')
const MongoDb = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new MongoDb())
const HERO_MOCK_REGISTER = {
  name: 'Wonder Woman',
  power: 'tie'
}

describe.only('MongoDB test suite', function () {
  this.beforeAll(async () => {
    await context.connect()
  })

  it('Should verify connection', async () => {
    const result = await context.isConnected()
    const expected = 'Connected'

    assert.deepEqual(expected, result)
  })

  it('Should register hero', async () => {
    const { name, power } = await context.create(HERO_MOCK_REGISTER)

    assert.deepEqual({ name, power }, HERO_MOCK_REGISTER)
  })

  it('Should list one hero', async () => {
    const [{ name, power }] = await context.read({ name: HERO_MOCK_REGISTER.name })
    assert.deepEqual({ name, power }, HERO_MOCK_REGISTER)
  })

});
