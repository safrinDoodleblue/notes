const noteService = require('./NotesService');

exports.getNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get notes' });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteService.createNote(req.user.id, title, content);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await noteService.updateNote(
      req.user.id,
      req.params.id,
      req.body
    );
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await noteService.deleteNote(req.user.id, req.params.id);
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
