const assert = require('assert')
const MongoDb = require('../db/strategies/mongodb/mongodb')
const Context = require('../db/strategies/base/contextStrategy')
const HeroiSchema = require(`./../db/strategies/mongodb/schemas/herosSchema`)

let context = {}
const HERO_MOCK_REGISTER = {
  name: 'Wonder Woman',
  power: 'tie'
}

const HERO_MOCK_UPDATE = {
  name: 'Daffy',
  power: 'velocity'
}

let UPDATE_HERO_ID;

describe.only('MongoDB test suite', function () {
  this.beforeAll(async () => {
    const connection = MongoDb.connect()
    context = new Context(new MongoDb(connection, HeroiSchema))

    const result = await context.create(HERO_MOCK_UPDATE)
    UPDATE_HERO_ID = result
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

  it('Should list a hero', async () => {
    const [{ name, power }] = await context.read({ name: HERO_MOCK_REGISTER.name })

    assert.deepEqual({ name, power }, HERO_MOCK_REGISTER)
  })

  it('Should update a hero', async () => {
    const result = await context.update(UPDATE_HERO_ID, {
      name: 'Bugs Bunny'
    })

    assert.deepEqual(result.nModified, 1)
  })

  it('Should delete hero', async () => {
    const result = await context.delete(UPDATE_HERO_ID)

    assert.deepEqual(result.n, 1)
  })

});
