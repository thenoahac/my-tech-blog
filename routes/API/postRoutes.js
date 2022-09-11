const router = require('express').Router();
const { blogPost } = require('../../models');
const { post } = require('./userRoutes');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
        const newblogPost = await blogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newblogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostInfo = await blogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!blogPostInfo) {
            res.status(404).json({ message: 'No post found with this id.'});
            return;
        }
        res.status(200).json(blogPostInfo);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogPostInfo = await blogPost.findOne({ 
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
             },
        });
        if(!blogPostInfo) {
            res.status(404).json({ message: 'No post found.' });
            return;
        }
        blogPost.update(
            {
                post_name: req.body.post_name,
                post_content: req.body.post_content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )
        res.status(200).json(blogPostInfo); 
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;