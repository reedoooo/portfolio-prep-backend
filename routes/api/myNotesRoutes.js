const MyNotesRoutes = require("../../models/NotesSchema");
const express = require("express");
const router = express.Router();

console.log("myNotesRoutes accessed");

router.get("/myNotesRoutes", async (req, res) => {
  try {
    // Fetch all notes from the database
    const myNotesRoutes = await MyNotesRoutes.find({});
    console.log("myNotesRoutes working");
    res.json(myNotesRoutes);
  } catch (err) {
    console.error("Error fetching myNotesRoutes", err);
    res.status(500).json({ error: "Failed to fetch myNotesRoutes" });
  }
});

router.post("/myTodoRoutes", async (req, res) => {
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

module.exports = router;
