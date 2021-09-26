const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if (entries.length) {
        res.json(entries[0])
      } else {
        res.status(400).json("There's no user with that id")
      }
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

export default handleImage;