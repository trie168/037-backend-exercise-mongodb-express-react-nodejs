const router = require('express').Router()
let User = require('../models/user.model')

// mengabil data
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// menambahkan data
router.route('/add').post((req, res) => {
    const username = req.body.username
    const newUser = new User({ username })

    newUser
        .save()
        .then(() => res.json('User add..!'))
        .catch(err => res.status(400).json('Error: ' + err))
})
// mengambil data id
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

// menghapus data id user
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User delete..!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// mengupdate data data user
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username
            user
                .save()
                .then(() => res.json('User update..!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
