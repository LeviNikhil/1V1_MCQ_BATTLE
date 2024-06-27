const express = require('express');
const { createMCQ, getMCQs, updateMCQ, deleteMCQ, checkAnswer } = require('../controllers/mcqControl');
const auth = require('../middlewares/validateTokenHandler');
const router = express.Router();

router.post('/check-answer/:id', auth, checkAnswer); // This should be defined

router.post('/', auth, createMCQ);
router.get('/', getMCQs);
router.put('/:id', auth, updateMCQ);
router.delete('/:id', auth, deleteMCQ);

module.exports = router;