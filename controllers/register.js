const handleRegister = (req, res, db, bcrypt) => {
  const { registerNameInput, registerEmailInput, registerPassInput } = req.body;
  const hash = bcrypt.hashSync(registerPassInput)

  if (!registerNameInput || !registerEmailInput || !registerPassInput) {
    return res.status(400).json('Please fill all forms correctly')
  }

  db.transaction(trx => {
    // ! Register user
    trx('users')
      .returning('*')
      .insert ({
        email: registerEmailInput,
        name: registerNameInput,
        joined_date: new Date()
      })
      .then (user => {
        res.json(user[0])
      })
      // ! Login with the registered user
      .then (
        trx.insert({
          hash: hash,
          email: registerEmailInput
        })
        .into('login')
        .returning('email')
        .then(loginEmail => console.log('Successfully login with', loginEmail[0]))
      )
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .catch (err => {
    res.status(400).json('Unable to register')
  })
}

export default handleRegister;