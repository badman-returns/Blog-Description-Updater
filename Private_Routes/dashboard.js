// This is the dashboard section and can be used with valid jwt

const router = require('express').Router();
const blogsetting = require('./blogsetting');

router.get('/', (req, res) => {
   res.send('Welcome to Dashboard')
})
// Route to blogsetting
router.use('/blogsetting', blogsetting);


module.exports = router;