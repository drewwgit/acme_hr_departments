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


// get all departments 
router.get("/", async (req, res, next) => {
    try {
        const response = await client.query(`SELECT * FROM departments`);
        res.send(response.rows)
    } catch (err) {
        next (err)
    }
})


// get all departmnets by id 

router.get('/:id', async(req, res, next)=>{
    try{
        const response = await client.query(`SELECT * FROM departments WHERE id = $1`, [req.params.id]);
        res.send(response.rows)
    }catch(err){
        next(err)
    }
})

module.exports = router; 