const client = require('./dbConnection');
const express = require('express');
const app = express();
const PORT = 3000;
const bcrypt = require('bcrypt');

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.get("/",(req,res)=>{
res.send(`Node JS Server Running Successfully on Port: ${PORT}`)
});

//Listening Port 3000
app.listen(PORT, ()=>{
console.log(`Server is Running on Port ${PORT}`)
});

//Post User
app.post('/users', async (req, res)=> {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try{
    hashedPassword = await bcrypt.hash(password, 10);
    let qry = `insert into users(name, email, password) 
                       values('${name}', '${email}', '${hashedPassword}')`

    client.query(qry, (err)=>{
        if(!err){
            res.send('User saved successfully!');
        }
        else{ 
        console.log(err.message) 
        }
    })
}
    catch(err){
    console.log(err.message);
    }
    client.end;
});

//Get Users

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.json(result.rows);
        }
    });
    client.end;
});

