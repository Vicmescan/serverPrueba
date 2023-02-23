const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());

//This will create a middleware.
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "./client/build")));

const transporter = require("./mailer");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

// take the data from the form and send it to the email address
app.post("/mail", (req, res) => {
  console.log(req.body);
  if (
    req.body.name !== "" &&
    req.body.email !== "" &&
    req.body.phone !== "" &&
    req.body.message !== ""
  ) {
    try {
      transporter.sendMail({
        to: "orejitax@gmail.com",
        subject: `${req.body.name} ha escrito desde la web. Asunto: ${req.body.subject} `,
        html: `
        <h4>Datos del autor/a/e que escribe el mensaje:</h4>
            <p>Nombre: ${req.body.name}</p>
            <p>Email: ${req.body.email}</p>
            <p>Teléfono: ${req.body.phone}</p>
            <p>Asundo del mensaje: ${req.body.subject}</p>
            <p>Message: ${req.body.message}</p>
            `,
      });
    } catch (err) {
      console.log(err);
    }

    res.send({ message: "Success" });
  } else {
    null;
  }
});

// console.log that your server is up and running

app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
