const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const HERO_REGISTER_MOCK = {
  name: 'Hawkman',
  power: 'arrow'
}

describe('Postgres', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect()
  })

  it('PostgresSQL Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('Should register a hero', async () => {
    const result = await context.create(HERO_REGISTER_MOCK)

    delete result.id
    assert.deepEqual(result, HERO_REGISTER_MOCK)
  })
})