const MyNotesRoutes = require("../../models/NotesSchema");
const express = require("express");
const router = express.Router();

console.log("myNotesRoutes accessed");

router.get("/myNotesRoutes", async (req, res) => {
  try {
    // Fetch all notes from the database
    const myNotesRoutes = await MyNotesRoutes.find({});

    console.log("myNotesRoutes working");

    res.status(200).json(myNotesRoutes);
  } catch (err) {
    console.error("Error fetching myNotesRoutes", err);
    res.status(500).json({ error: "Failed to fetch myNotesRoutes" });
  }
});

router.post("/myNotesRoutes", async (req, res) => {
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
    res.status(200).json("Data added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

router.put("/myNotesRoutes/:id", async (req, res) => {
  console.log("myNotesRoutes putted");
  const { id } = req.params;
  const { title, notes } = req.body;

  try {
    const updatedNote = await MyNotesRoutes.findByIdAndUpdate(
      id,
      { $set: { "contents.0.title": title, "contents.0.notes": notes } },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Since contents always has one note, it's safe to grab the first element
    const updatedNoteContents = updatedNote.contents[0];

    res.status(200).json(updatedNoteContents);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});


router.delete("/myNotesRoutes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await MyNotesRoutes.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
