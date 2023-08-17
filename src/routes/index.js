const express = require('express');
const router = express.Router();

const myUserRoutes = require('./api/userRoutes');
const myProfileRoute = require('./api/profileRoutes');
// const profileRoutes = require('./api/profileRoutes');
const myTabRoutes = require('./api/tabRoutes');
const myTodoRoutes = require('./api/todoRoutes');
const mySettingsRoutes = require('./api/settingsRoutes');
const myNotesRoutes = require('./api/notesRoutes');
const TCGPlayerRoutes = require('./api/tcgPlayerRoutes');
const myOpenAiRoutes = require('./api/openAiRoutes');
const productRoutes = require('./api/productRoutes');
const categoryRoutes = require('./api/categoryRoutes');

router.use('/tab', myTabRoutes);
router.use('/todo', myTodoRoutes);
router.use('/tcg', TCGPlayerRoutes);
router.use('/users', myUserRoutes);
router.use('/notes', myNotesRoutes);
router.use('/settings', mySettingsRoutes);
router.use('/chat', myOpenAiRoutes);
router.use('/myprofile', myProfileRoute);
// router.use('/privateroute/profile', profileRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
