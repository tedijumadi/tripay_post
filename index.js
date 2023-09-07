const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Diperlukan untuk mengurai body dari permintaan POST
const axios = require('axios'); // Diperlukan untuk melakukan permintaan HTTP

app.use(bodyParser.json()); // Menggunakan body-parser untuk mengurai body permintaan JSON

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/get', (req, res) => {
  res.send('Get Momon');
});

app.get('/post', (req, res) => {
  res.send('Post Momon');
});

app.get('/add', (req, res) => {
  res.send('New record added');
});

app.get('/demo', (req, res) => {
  res.json([
    {
      id: '001',
      name: 'Smith',
      email: 'smith@gmail.com',
    },
    {
      id: '002',
      name: 'Yuya',
      email: 'yuya@gmail.com', // Ubah email agar tidak sama dengan yang lain
    },
    {
      id: '003',
      name: 'Budi',
      email: 'budi@gmail.com', // Ubah email agar tidak sama dengan yang lain
    },
  ]);
});

const crypto = require('crypto');
const dataToHash = 'Hello, World!';
const hash = crypto.createHash('sha256');
hash.update(dataToHash);
const hashedData = hash.digest('hex');

app.get('/cryptohash', (req, res) => {
  res.send(hashedData);
});

app.post("/tripaytest", async (req, res) => {
  try {
    var apiKey = "DEV-0YYXsD6DlWN3gJbKYmeUV5iA2xicxxx13H1qlAmg";
    var privateKey = "QWkHj-QQvCX-ZAUfI-ekwck-KGb64";

    var merchant_code = "T25287";
    var merchant_ref = req.body.merchant_ref;
    var amount = req.body.amount;

    var expiry = parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60);

    var signature = crypto
      .createHmac("sha256", privateKey)
      .update(merchant_code + merchant_ref + amount)
      .digest("hex");

    var payload = {
      method: req.body.method,
      merchant_ref: merchant_ref,
      amount: amount,
      customer_name: req.body.customer_name,
      customer_email: req.body.customer_email,
      customer_phone: req.body.customer_phone,
      order_items: req.body.order_items,
      return_url: req.body.return_url,
      expired_time: expiry,
      signature: signature,
    };

    const response = await axios.post("https://tripay.co.id/api-sandbox/transaction/create", payload, {
      headers: { Authorization: "Bearer " + apiKey },
      validateStatus: function(status) {
        return status < 999;
      },
    });

    res.status(200).json({
      message: "sukses",
      callbackUrl: response.data.data.checkout_url,
    });
  } catch (error) {
    res.status(200).json({
      message: "error",
    });
  }
});

const HTTP_PORT = process.env.PORT || 3000;
app.listen(HTTP_PORT, () => {
  console.log(`Server is listening at port ${HTTP_PORT}`);
});
