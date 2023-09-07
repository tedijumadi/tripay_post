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



const crypto = require('crypto');
const dataToHash = 'Hello, World!';
// Membuat objek hash dengan algoritma SHA-256
const hash = crypto.createHash('sha256');
// Menambahkan data yang akan di-hash
hash.update(dataToHash);
// Menghasilkan hasil hash dalam format hexadecimal
const hashedData = hash.digest('hex');
// console.log('Hasil Hash:', hashedData);

app.get('/cryptohash',(req, res)=>{
    res.send(hashedData);
});





const HTTP_PORT = process.env.PORT || 8080;
app.listen(HTTP_PORT, ()=>{
    console.log(`Server is listening at port ${HTTP_PORT}`);
});