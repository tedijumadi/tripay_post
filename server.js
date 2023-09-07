const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/get', (req, res) =>{
    res.send('Get Momon');
});

app.get('/post', (req, res) =>{
    res.send('post Momon');
});

app.get('/add',(req, res)=>{
    res.send('new recoed added')
});


app.get('/demo', (req, res)=>{
    res.json([
        {
            id:'001',
            name:'Smith',
            email:'smith@gmail.com',
        },
        {
            id:'002',
            name:'Yuya',
            email:'smith@gmail.com',
        },
        {
            id:'003',
            name:'Budi',
            email:'smith@gmail.com',
        },

    ]);
});



const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT, ()=>{
    console.log(`Server is listening at port ${HTTP_PORT}`);
});