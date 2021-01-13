const assert = require('assert')
const api = require('./../api');

let app = {}
describe('Test suit for Hero api', async function () {
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

});