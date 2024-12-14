const express = require('express');
const { getChatHistory, saveChatMessage } = require('../controllers/chatController');
const router = express.Router();

router.get('/:roomId', getChatHistory); // Fetch chat history
router.post('/', saveChatMessage); // Save a new chat message

module.exports = router;
