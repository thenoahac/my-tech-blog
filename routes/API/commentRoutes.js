const router = require('express').Router();
const { Comment, blogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:blogPost_id/comments', (req, res) => {
    Comment.findAll({
        include: [ 
            {
                all: true,
                nested: true,
            }
        ]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "Error", err})
    })
});

router.post('/:blogPost_id/comments', withAuth, async (req, res) => {
    if(!req.session.logged_in) {
        return res.status(403).json({ message: "must be logged in to comment"})
    }
    Comment.create({
        ...req.body,
        user_id: req.session.user_id,
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ message: "Error", err})
    })
});

router.delete('/:blogPost_id/comments/:id', withAuth, async (req, res) => {
    try {
        const commentInfo = await Comment.destroy({
            where: {
                // do I need to do the blogpost id here too?
                id:req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!commentInfo) {
            res.status(404).json({ message: "no comment found" });
            return;
        }
        res.status(200).json(commentInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;