const router = require('express').Router();
const { User, Post, Group } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_body',
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
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        user_id: req.body.user_id,
        group_id: req.body.group_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Post.update(req.body, {
        where: {
            id: req.params.id,
        }
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({ message: "No post found with that id."});
                return;
            }

            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;