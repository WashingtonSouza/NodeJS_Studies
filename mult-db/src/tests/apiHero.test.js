const assert = require('assert')
const api = require('./../api');

let app = {}
let LIMIT_LENGTH = 0
describe.only('Test suit for Hero api', async function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Should list heroes through', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/hero'
    })

    const data = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(data))
  })

  it('List /hero - Should return at list 3 registers', async () => {
    LIMIT_LENGTH = 3
    const result = await app.inject({
      method: 'GET',
      url: `/hero?skip=0&limit=${LIMIT_LENGTH}`
    })

    const data = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(data.length === LIMIT_LENGTH)
  })

  it('List /hero - Should return error for incorrect limit', async () => {
    LIMIT_LENGTH = 'kkkkk'
    const result = await app.inject({
      method: 'GET',
      url: `/hero?skip=0&limit=${LIMIT_LENGTH}`
    })

    const statusCode = result.statusCode
    assert.deepEqual(statusCode, 500)
  })

  it('List /hero - Should filter a hero by name', async () => {
    const NAME = 'Wonder Woman-1610593798859'
    LIMIT_LENGTH = 3
    const result = await app.inject({
      method: 'GET',
      url: `/hero?skip=0&limit=1000&name=${NAME}`
    })

    const [{ name }] = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.deepEqual(name, NAME)
  })

});