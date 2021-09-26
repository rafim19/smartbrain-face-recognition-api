import express from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignIn from "./controllers/signIn.js";
import handleProfile from "./controllers/profile.js";
import handleImage from "./controllers/image.js";

const db = knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'yessql',
    database : 'smart-brain'
  }
});

const app = express();

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.json('Success'))
app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => handleProfile(req, res, db))
app.put('/image', (req, res) => handleImage(req, res, db))

app.listen(3000, () => console.log('app is working'))