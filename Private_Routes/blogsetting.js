// This route helps to display & control the blogsettings.

const router = require('express').Router();
const blogController = require('../controllers/blogController');

router.get('/',(req, res) => {
    res.send('Welcome to blog setting section. Here you can read, update, delete and mange your blogs.');
})
router.get('/all', blogController.getAll);
router.post('/create', blogController.create);
router.get('/:blogId', blogController.getById);
router.put('/:blogId', blogController.updateById);
router.delete('/:blogId', blogController.deleteById);
module.exports = router;
