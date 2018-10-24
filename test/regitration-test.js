let assert = require("assert");
const allCars = require("../registration.js");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/registrations';

const pool = new Pool({
  connectionString
});

describe(' registrations', function () {
  beforeEach(async () => {
    await pool.query('delete from reg_numbers');
  })



  it(' check the registraion if its from Cape Town ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CD 123-123');

    let cars = await registraion.allCars()
    assert.equal(cars[0].reg_number, 'CA 123-123' )
  });

  it(' check the registraion if its from Paarl ', async function () {

    var registraion = allCars(pool);
    await registraion.inputReg('CJ 123-123');

    let cars = await registraion.allCars()
    assert.equal(cars[0].reg_number, 'CJ 123-123' )
  });


  describe(' filter', function () {

  it(' Should filter the registraion if its from Ceres ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CT 123');

    let cars = await registraion.regFilter('CT')
    assert.equal(cars[0].reg_number, 'CT 123' )
  });

  it(' Should filter the registraion if its from Paarl ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CJ 123-123');
    await registraion.inputReg('CA 123-123');

    let cars = await registraion.regFilter('CJ')
    assert.equal(cars[0].reg_number, 'CJ 123-123' )
  });

});


describe(' validate town', function () {
  it(' check the registraion if the town does not exist ', async function () {
    var registraion = allCars(pool);
    assert.equal(await registraion.inputReg('CY 123-123'), 'not a valid town' )
  });
  
  it(' it should not duplicate registrations ', async function () {
    var registraion = allCars(pool);
    await registraion.inputReg('CJ 123-123');
    await registraion.inputReg('CJ 123-123');
    assert.equal(await registraion.inputReg('CJ 123-123'), 'registration number already exists' )
  });

  it(' it should successfully add town ', async function () {
    var registraion = allCars(pool);
    assert.equal(await registraion.inputReg('CT 123-123'), 'successfully added' )
  });

  it(' check if you inserted any registration ', async function () {
    var registraion = allCars(pool);
    assert.equal(await registraion.inputReg(''), 'please enter a registration number' )
  });
  
});


describe(' reset Button', function () {
  it(' Should clear reg and return an empty list ', async function () {


    var registraion = allCars(pool);

    await registraion.inputReg('CY 123-123')
    assert.equal(await registraion.resetDataBase(), 'database cleared' )
  });
});
  after(async function() {
    await pool.end();
  });
});