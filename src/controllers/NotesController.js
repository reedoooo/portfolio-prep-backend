const MyNotesRoutes = require('../models/NotesSchema');

exports.getNotes = async (req, res) => {
  try {
    const myNotesRoutes = await MyNotesRoutes.find({});
    res.status(200).json(myNotesRoutes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch myNotesRoutes' });
  }
};

exports.createNote = async (req, res) => {
  const { title, notes } = req.body;

  const myNotesRoutes = new MyNotesRoutes({
    contents: [
      {
        title,
        notes,
      },
    ],
  });

  try {
    await myNotesRoutes.save();
    res.status(200).json('Data added successfully');
  } catch (error) {
    res.status(500).json('Server error');
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, notes } = req.body;

  try {
    const updatedNote = await MyNotesRoutes.findByIdAndUpdate(
      id,
      { $set: { 'contents.0.title': title, 'contents.0.notes': notes } },
      { new: true },
    );

    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json(updatedNote.contents[0]);
  } catch (error) {
    res.status(500).json('Server error');
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await MyNotesRoutes.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
