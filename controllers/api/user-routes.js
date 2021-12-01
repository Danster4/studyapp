const router = require('express').Router();
const { User, Group, Post } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: 'password' },
        include: [
            {
                model: Post,
                attributes: [
                    'id', 
                    'post_title',
                    'post_body',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Group,
                        attributes: ['group_name']
                    }
                ]
            },
            {
                model: Group,
                attributes: ['group_name']
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });;
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: 'password' },
        include: [
            {
                model: Post,
                attributes: [
                    'id', 
                    'post_title',
                    'post_body',
                    'created_at'
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Group,
                        attributes: ['group_name']
                    }
                ]
            }
        ]
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json(({ message: 'No user found with this id.'}));
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json(({ message: 'No user found with this id.'}));
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json(({ message: 'No user found with this id.'}));
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;