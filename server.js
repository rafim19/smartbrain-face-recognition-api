import express from "express";
// import bcrypt from "bcrypt-nodejs";
import cors from "cors";

const app = express();

let database = {
  users: [
    {
      id: 100,
      name: 'Rafi',
      email: 'rafimuhammad80@gmail.com',
      password: 'pass',
      entries: 0,
      joinedDate: new Date()
    },
    {
      id: 101,
      name: 'Seo-Lang-Ling-Lung',
      email: 'siapbang@nyahoo.com',
      password: 'vivaronaldo',
      entries: 0,
      joinedDate: new Date()
    }
  ]
}

const searchUserById = (id) => {
  let index = 0;
  for (let user of database.users) {
    if (user.id === Number(id)) {
      return index;
    } else if (user.id !== Number(id) && index === database.users.length-1) {
      return -1;
    }
    index++;
  }
}

// MIDDLEWARE
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  // // Load hash from your password DB.
  // bcrypt.compare("pararunten", '$2a$10$FSCfp5IPLAsxEdZ7TwAATu2GOlzTX29EiP.nvuROOljfZ4Tuutghq', function(err, res) {
  //   // res == true
  //   console.log('first hash =', res)
  // });
  // bcrypt.compare("pararunten", '$2a$10$HB59T2od6Iq168p1FpYreOO1xFHqRZb58IIHNOPnt5X4Ib.qEDhii', function(err, res) {
  //   // res = false
  //   console.log('second hash =', res)
  // });
  // bcrypt.compare("tes", '$2a$10$HB59T2od6Iq168p1FpYreOO1xFHqRZb58IIHNOPnt5X4Ib.qEDhii', function(err, res) {
  //   // res = false 
  //   console.log('third hash =', res)
  // });
  // console.log(req.body.signInEmailInput, req.body.signInPasswordInput)
  if (req.body.signInEmailInput === database.users[0].email && req.body.signInPasswordInput === database.users[0].password) {
    return res.json(database.users[0])
  }
  return res.status(400).json('Error logging in')
})

app.post('/register', (req, res) => {
  const { users } = database;
  const { registerNameInput, registerEmailInput, registerPassInput } = req.body;

  // bcrypt.hash(password, null, null, function(err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash)
  // });

  let lastId = users[users.length-1].id;
  users.push(
    {
      id: lastId+1,
      name: registerNameInput,
      email: registerEmailInput,
      password: registerPassInput,
      entries: 0,
      joinedDate: new Date()
    }
  )
  // console.log(users)

  res.json({
    id: users[users.length-1].id,
    name: users[users.length-1].name,
    email: users[users.length-1].email,
    entries: users[users.length-1].entries,
    joinedDate: users[users.length-1].joinedDate
  })
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const searchUser = searchUserById(id);

  if (searchUser != -1) {
    return res.json(`Hi everyone, it's me ${database.users[searchUser].name}!`)
  } else {
    return res.status(404).json(`There's no user with id: ${id}`)
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  const searchUser = searchUserById(id);

  if (searchUser != -1) {
    database.users[searchUser].entries++
    console.log('entries back-end =', database.users[searchUser].entries)
    return res.json(database.users[searchUser].entries)
  } else {
    return res.status(404).json('error at server.js route /image')
  }
})

app.listen(3000, () => console.log('app is working'))