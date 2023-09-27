const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


// Define a route to serve your HTML files
app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

app.get('/project.html', (req, res) => {
    res.sendFile(__dirname + '/project.html'); 
});

app.get('/contact.html', (req, res) => {
    res.sendFile(__dirname + '/contact.html'); 
});

app.use(express.static((__dirname, "public")));

app.use(express.static('image'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'labhishettysaikalyan@gmail.com',
    pass: 'ecwe cbhf wcoj vxlx',
  },
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
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
      res.send('Email sent successfully.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
