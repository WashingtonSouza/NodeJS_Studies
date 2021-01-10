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
    await context.delete()
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
    const [updateItem] = await context.read({ name: HERO_UPDATE_MOCK.name })
    const newItem = {
      ...HERO_UPDATE_MOCK,
      name: 'Wonder Woman'
    }

    const [result] = await context.update(updateItem.id, newItem)
    const [updatedItem] = await context.read({ id: updateItem.id })

    assert.deepEqual(result, 1)
    assert.deepEqual(updatedItem.name, newItem.name)
  })

  it('Shout delete a hero', async () => {
    const [item] = await context.read({})
    const result = await context.delete(item.id)

    assert.deepEqual(result, 1)
  })
})