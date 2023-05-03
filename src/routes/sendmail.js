const express  = require('express');
const router = express.Router();
const formData = require('form-data');
const Mailgun = require('mailgun.js')
const dotenv = require('dotenv');

dotenv.config();

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

router.get('/', (req, res) => {
    res.send('Correo enviado');});

router.post('/', (req, res) => {
    const {to, subject, message} = req.body;
    const messageData = {
        from: 'Jose Luis Manon <joseluismanonrosario@gmail.com>',
        to: `${to}`,
        subject: `${subject}`,
        text: `${message}`
      };

      client.messages.create(process.env.MAILGUN_DOMAIN, messageData)
      .then((mes) => {
        res.send({
            message:'Email send successfully!'
        })
        console.log(mes.message)
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
            message: 'Something went wrong in sending message!'
        });
      });

});

module.exports = router;
