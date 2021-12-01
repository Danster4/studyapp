const router = require('express').Router();
const { User, Post, Group } = require('../../models');

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
                    },
                    {
                        model: Group,
                        attributes: ['group_name']
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

module.exports = router;