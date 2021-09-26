const handleSignIn = (req, res, db, bcrypt) => {
  const { signInEmailInput, signInPasswordInput } = req.body;

  if (!signInEmailInput || !signInPasswordInput) {
    return res.status(400).json('Please fill all forms correctly')
  }

  db.select ('hash', 'email')
    .from ('login')
    .where ('email', '=', signInEmailInput)
    .then (data => {
      const isValid = bcrypt.compareSync(signInPasswordInput, data[0].hash);
      if (isValid) {
        return  db.select ('*')
                  .from ('users')
                  .where ('email', '=', data[0].email)
                  .then (user => {
                    res.json(user[0])
                  })
                  .catch(err => res.status(400).json('Unable to get user'))
      } else {
        res.status(400).json('Wrong credentials password')
      }
    })
    .catch(err => res.status(400).json('Wrong credentials email'))
}

export default handleSignIn;