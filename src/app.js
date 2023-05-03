const express = require('express');
const app = express();
const sendmail = require('./routes/sendmail.js');

const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
 
const port = process.env.PORT || 3000;


app.use('/api/mail', sendmail);

app.get('/',(req, res)=>{
    res.send('Hola');
    console.log(process.env.KEY)
})

app.listen(port, () => {
    console.log('Express server listening on port', port);
});