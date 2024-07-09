const express = require('express');
const { createMCQ, getMCQs,getMCQ, updateMCQ, deleteMCQ, checkAnswer } = require('../controllers/mcqControl');
const auth = require('../middlewares/validateTokenHandler');
const router = express.Router();

router.post('/check-answer/:id', auth, checkAnswer); // This should be defined

router.post('/', auth, createMCQ);
router.get('/', getMCQs);
router.get('/:id', getMCQ);
router.put('/:id/edit', auth, updateMCQ);
router.delete('/:id', auth, deleteMCQ);

module.exports = router;