const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');     //initialize database

const app = express();              //initialize framework

app.use(bodyParser.json());
app.use(cors());

// const pool = new Pool({
//  user: 'postgres',
//  host: 'localhost',
//  database: 'todolist',
//  password: 'Laniakea01',
//  port: 5432,
// });

const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'todolist',
   password: 'Laniakea01',
   port: 5432,
 });

 client.connect(function(err) {
   if (err) { 
      consol.log(err) 
   }

   else{
      console.log("Connected.");
   }
 });

app.get('/', async (req, res) => {
   try {
      res.status(200).json({
         //object
         status: 'okay', 
         data: [{
            id: 1,
            description: 'hello world',
         }]   
      });  //chining method
   } catch (err) {
      console.error(err.message);
   }
});

//router
app.get('/todos', async (req, res) => {
 try {
   // await client.connect();
    const result = await client.query('SELECT * FROM todos');
    res.status(200).json(result.rows);
 } catch (err) {
    console.error(err.message);
 } finally {
   // client.end();
 }
});

// app.post('/todos', async (req, res) => {
//  try {
//     const { description } = req.body;
//     const result = await pool.query('INSERT INTO todos (description) VALUES ($1) RETURNING *', [description]);
//     res.json(result.rows[0]);
//  } catch (err) {
//     console.error(err.message);
//  }
// });

// app.put('/todos/:id', async (req, res) => {
//  try {
//     const { id } = req.params;
//     const { completed } = req.body;
//     const result = await pool.query('UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *', [completed, id]);
//     res.json(result.rows[0]);
//  } catch (err) {
//     console.error(err.message);
//  }
// });

// app.delete('/todos/:id', async (req, res) => {
//  try {
//     const { id } = req.params;
//     const result = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
//     res.json({ message: 'Todo deleted' });
//  } catch (err) {
//     console.error(err.message);
//  }
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//http meethod: put, get, method, delete
//integrasi FE
//Mempelajari basic basic object, tipe data, js