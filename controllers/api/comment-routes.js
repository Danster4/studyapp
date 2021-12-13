const router = require('express').Router();
const { User, Post, Group, Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_title', 'post_body', 'created_at'],
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
        .then(dbCommData => res.json(dbCommData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment_text',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_title', 'post_body', 'created_at'],
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
        .then(dbCommData => {
            if(!dbCommData) {
                res.status(404).json({ message: "No comment found with this id." });
                return;
            }

            res.json(dbCommData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommData => res.json(dbCommData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id,
        }
    })
        .then(dbCommData => {
            if(!dbCommData) {
                res.status(404).json({ message: "No comment found with that id."});
                return;
            }

            res.json(dbCommData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommData => {
            if (!dbCommData) {
                res.status(404).json({ message: "No comment found with that id."});
                return;
            }

            res.json(dbCommData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;