const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const HERO_REGISTER_MOCK = {
  name: 'Hawkman',
  power: 'arrow'
}

const HERO_UPDATE_MOCK = {
  name: 'Batman',
  power: 'money'
}

describe('Postgres', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect()
    await context.create(HERO_UPDATE_MOCK)
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

  it('Should list heroes', async () => {
    const [result] = await context.read({ name: HERO_REGISTER_MOCK.name })
    delete result.id

    assert.deepEqual(result, HERO_REGISTER_MOCK)
  })

  it('Should update a hero', async () => {
    const [updatedItem] = await context.read({ name: HERO_UPDATE_MOCK.name })
    const newItem = {
      ...HERO_UPDATE_MOCK,
      name: 'Wonder Woman'
    }

    const result = await context.update(updatedItem.id, newItem)
    assert.deepEqual(result.name, newItem.name)
  })
})