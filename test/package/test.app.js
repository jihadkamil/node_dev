const expect = require('chai').expect
const request = require('supertest')

const app = require('../../index.js')
const conn = require('../../Models/db')

describe('POST /package', () => {
  before((done) => {
    conn
      .getConnection()
      .then(() => done())
      .catch((err) => done(err))
  })

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err))
  })

  it('OK, creating a new package works', (done) => {
    request(app)
      .post('/package')
      .send({
        destination_data: {
          customer_name: 'PT AMARIS HOTEL SIMPANG LIMA',
          customer_address: 'JL. KH. AHMAD DAHLAN NO. 01, SEMARANG TENGAH',
          customer_email: null,
          customer_phone: '0248453499',
          customer_address_detail: 'KOTA SEMARANG SEMARANG TENGAH KARANGKIDUL',
          customer_zip_code: '50241',
          zone_code: 'SMG',
          organization_id: 6,
          location_id: '5cecb20b6c49615b174c3e74',
        },
      })
      .then((res) => {
        const body = res.body
        expect(body).to.contain.property('_id')
        done()
      })
  })
})
