const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Group, Post, Comment } = require('../models');

router.get('/:id', (req, res) => {
    Group.findOne({
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
            const posts = dbGroupData.get({ plain: true });
            res.render('group', posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;