const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Group, Post, Comment } = require('../models');

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
                        model: Comment,
                        attributes: [
                            'comment_text',
                            'created_at'
                        ], 
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            },
                        ]
                    }
                ]
            }
        ]
    })
    .then(dbGroupData => {
        // serialize data before passing to template
        const groups = dbGroupData.map(group => group.get({ plain: true }));
        res.render('groups', { groups });
    })
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
                    },
                    {
                        model: Comment,
                        attributes: [
                            'comment_text',
                            'created_at'
                        ], 
                        include: [
                            {
                                model: User,
                                attributes: ['username']
                            },
                        ]
                    }
                ]
            }
        ]
    })
        .then(dbGroupData => {
            if(!dbGroupData) {
                res.status(404).json({ message: "No group found with this id." });
                return
            }
            const group = dbGroupData.get({ plain: true });
            res.render('single-group', group);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;