const express = require("express");
const router = express.Router();
const pg = require("pg");
const client = new pg.Client("postgres://localhost:5432/acme_hr_directory");

client.connect((err) => {
    if (err) {
      console.error("Connection Error Has Occurred", err.stack);
    } else {
      console.log("Connected!");
    }
  });

// get all employees 
  router.get("/", async (req, res, next) => {
    try {
        const response = await client.query(`SELECT * FROM employees`);
        res.send(response.rows)
    } catch (err) {
        next (err)
    }
})


// get employee by ID 

router.get('/:id', async(req, res, next)=>{
    try{
        const response = await client.query(`SELECT * FROM employees WHERE id = $1`, [req.params.id]);
        res.send(response.rows[0])
    }catch(err){
        next(err)
    }
})

// post created employee

router.post('/', async(req, res, next)=>{
    try{
        const response = await client.query(`INSERT INTO employees(name, department) VALUES($1, $2)`,
            [req.body.name, req.body.department]);
        res.send({
            name: req.body.name,
            department: req.body.department,
        })
    
    }catch(err){
        next(err)
    }
})


// delete employee 

router.delete("/:id", async (req, res, next) => {
    try {
      const response = await client.query(`DELETE from employees WHERE id =$1`, [
        Number(req.params.id),
      ]);
      res
        .send({
          id: req.params.id,
        })
        .sendStatus(204);
    } catch (err) {
      next(err);
    }
  });


// update (put) employees

router.put("/:id", async(req,res,next)=>{
    try{
       const response = await client.query(`UPDATE employees SET name=$1,  department=$2, updated_at=now() WHERE id=$3 RETURNING *`,
           [req.body.name, Number(req.body.department), Number(req.params.id) ]);
       res.send(response.rows[0])
    }catch(err){
        next(err)
    }
})

module.exports = router;
