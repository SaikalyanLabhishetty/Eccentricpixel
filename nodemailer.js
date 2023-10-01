const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(express.static((__dirname, "public")));
app.use('/css',express.static(__dirname+'/public/css'))
app.use('/js',express.static(__dirname+'/public/js'))
app.use('/html',express.static(__dirname+'/public/html'))
app.use(express.static('image'));

// Define a route to serve your HTML files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

app.get('/project.html', (req, res) => {
    res.sendFile(__dirname + '/project.html'); 
});

app.get('/contact.html', (req, res) => {
    res.sendFile(__dirname + '/contact.html'); 
});
app.get('/success.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/success.html'); 
});

app.get('/error.html', (req, res) => {
  res.sendFile(__dirname + '/public/html/error.html'); 
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'labhishettysaikalyan@gmail.com',
    pass: 'ecwe cbhf wcoj vxlx',
  },
});



app.post('/sendEmail', (req, res) => {
  const { name, email, phone,design_type,date } = req.body;

  const admin = 'labhishettysaikalyan@gmail.com'

  const mailOptions = {
    from: "labhishettysaikalyan@gmail.com",
    to: [admin,email].join(','),
    subject: "Eccentricpixel Design Requirements",
    text: `Here are the details\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDesign Type: ${design_type}\nSubmission Date: ${date},\n Thankyou. we will reach out soon!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('Error: Email could not be sent.');
    } else {
      console.log('Email sent:', info.response);
      res.redirect('/success.html');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
