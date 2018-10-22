let assert = require("assert");
const allCars = require("../registration.js");
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/registrations';

const pool = new Pool({
  connectionString
});

describe(' regitrations', function () {
  beforeEach(async () => {
    await pool.query('delete from reg_numbers');
  })



  it(' check the registraion if its from Cape Town ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CA 123-123');

    let cars = await registraion.allCars()
    assert.equal(cars[0].reg_number, 'CA 123-123' )
  });
  it(' check the registraion if its from Ceres ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CT 123');

    let cars = await registraion.allCars()
    assert.equal(cars[0].reg_number, 'CT 123' )
  });

  it(' check the registraion if its from Paarl ', async function () {


    var registraion = allCars(pool);
    await registraion.inputReg('CJ 123-123');

    let cars = await registraion.allCars()
    assert.equal(cars[0].reg_number, 'CJ 123-123' )
  });
 
//   describe(' resetBtn', function() {
//     beforeEach(async () => {
//       await pool.query('delete from reg_numbers');
//     })
//     it('should delete everyone that was greeted on the data base',  async function() {
//       var registraion = allCars(pool);


//       await registraion.resetDataBase()
//       var reg = await registraion.inputReg();

//       assert.deepEqual(reg, []);
//     });


//    });

//   after(async function() {
//     await pool.end();
//   });
});