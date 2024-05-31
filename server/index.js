const express = require("express");
const baseQuery = "/api/";
const app = express(); 

app.use(express.json());

// static routes 
app.get(baseQuery, (req, res) => {
    res.json({
      success: "true",
    });
  });

// routing 

app.use(baseQuery + "employees", require ("./employees"));
app.use(baseQuery + "departments", require ("./departments"));


app.listen(8080, () => {
    console.log("App is running at port 8080");
  });