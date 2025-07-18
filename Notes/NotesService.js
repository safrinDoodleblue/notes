const Note = require('./NotesModel');

exports.getNotesByUserId = async (userId) => {
  return await Note.find({ user_id: userId });
};

exports.getAllNotes = async () => {
  return await Note.find();
};

exports.createNote= async (userId, title, content) => {
  const note = new Note({ title, content, user_id: userId });
  return await note.save();
};

exports.updateNote = async (userId, noteId, data) => {
  return await Note.findOneAndUpdate({ _id: noteId, user_id: userId }, data, { new: true });
};

exports.deleteNote = async (userId, noteId) => {
  return await Note.findOneAndDelete({ _id: noteId, user_id: userId });
};
