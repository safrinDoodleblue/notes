const express = require('express');
const router = express.Router();
const passport = require('passport');
const notesController = require('./notesController');
const validate = require('../Middleware/validate');
const { noteSchema } = require('./NotesValidation');

router.post('/', passport.authenticate('jwt', { session: false }), validate(noteSchema), notesController.createNote);
router.get('/', passport.authenticate('jwt', { session: false }), notesController.getNotes);
router.put('/:id', passport.authenticate('jwt', { session: false }), validate(noteSchema), notesController.updateNote);
router.delete('/:id', passport.authenticate('jwt', { session: false }), notesController.deleteNote);

module.exports = router;

