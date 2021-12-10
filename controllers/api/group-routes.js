const router = require('express').Router();
const { Group, User, Grouping, Post } = require('../../models');

router.get('/', (req, res) => {
    Group.findAll({
        attributes: [
            'id',
            'group_name'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: [
                    'id', 
                    'post_title',
                    'post_body',
                    'created_at'
                ],
                include:[
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Group.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'group_name'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: [
                    'id', 
                    'post_title',
                    'post_body',
                    'created_at'
                ],
                include:[
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(dbGroupData => {
            if (!dbGroupData) {
                res.status(404).json({ message: "No group found with this id."});
                return;
            }

            res.json(dbGroupData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Group.create({
        group_name: req.body.group_name,
        user_id: req.body.user_id
    })
        .then(dbGroupData => res.json(dbGroupData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/addmems', (req, res) => {
    if (req.session) {
        Group.addmems({ ...req.body, user_id: req.session.user_id }, {Grouping, User })
        .then(updatedMemberData => res.json(updatedMemberData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/:id', (req, res) => {
    Group.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbGroupData => {
            if (!dbGroupData) {
                res.status(404).json(dbGroupData);
                return;
            }

            res.json(dbGroupData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Group.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbGroupData => {
            if (!dbGroupData) {
                res.status(404).json({ message: "No group found with this id."});
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;