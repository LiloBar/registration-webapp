
module.exports = function (pool) {


  async function inputReg(regNumber) {
  if(regNumber !== ""){
    regNumber = regNumber.toUpperCase();
    let tag = regNumber.substring(0,3).trim();

    let foundTown = await pool.query("select id from towns where town_tag=$1", [tag]);
    if (foundTown.rowCount < 1) {
      return "not a valid town";
    }

    let foundReg = await pool.query("select * from reg_numbers where reg_number=$1", [regNumber]);
    if(foundReg.rowCount < 1){
      await pool.query("insert into reg_numbers(reg_number, town_id) values($1, $2)", [regNumber, foundTown.rows[0].id]);
      return "successfully added"
    }
    return 'registration number already exists';
  }
  return "please enter a registration number";
}

  async function allCars() {
    let result = await pool.query("select * from reg_numbers");
    return result.rows;
  }

  async function plates(){
    return reg;
  }

  async function regFilter(selectedTown) {
     // CAW
   
    if (selectedTown === "All") {
      return await allCars();
    }
    
    // for specific town
    const foundTown = await pool.query('select id from towns where town_tag=$1', [selectedTown]);
    let townID = foundTown.rows[0].id;
    const filteredRegs = await pool.query('select * from reg_numbers where town_id=$1', [townID]);
    return filteredRegs.rows;
  }

  async function resetDataBase() {
    await pool.query('delete from reg_numbers')
   //return results.rows
 }

 async function getTowns() {
   const result = await pool.query('select * from towns');
   return result.rows;
 }

  return {
    inputReg,
    plates,
    resetDataBase,
   allCars,
   regFilter,
   getTowns
  }

}