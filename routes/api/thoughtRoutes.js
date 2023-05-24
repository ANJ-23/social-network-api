const router = require("express").Router();
const { User, Thoughts, Reactions } = require("../../models");
const { getAllThoughts, getOneThought, createThought } = require("../../controllers/thoughtController");

// =========== THOUGHT ROUTES =========== //

// GET - finds all thoughts in database
router.get("/", async (req, res) => {
  try {
      const thoughts = await getAllThoughts();
      res.status(200).json({ status: "success", payload: thoughts });
  } catch(err) {
      res.status(400).json({err});
  }
})

// GET - finds one Thought in database
router.get("/:id", async (req, res) => {
  try {
      const thought = await getOneThought(req.params.id);
      res.status(200).json({ status: "success", payload: thought });
  } catch(err) {
      res.status(400).json({err});
  }
})

// POST - create new thought with the object in the request + adds it to user's thoughts
router.post('/', async (req, res) => {
  try {
    const userId = req.body.userId;
    
    const newThought = await createThought({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    
    // places thought's ID in a user's "thoughts" array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: {thoughts: newThought} },
      { new: true },
    );

    // console.log(newThought.createdAt);

    res.json({ status: "success", payload: { newThought, updatedUser } });
  } catch(err) {
    res.status(400).json({err});
  }
});

// PUT - updates a thought's data via user's Mongo ID
router.put('/:id', async (req, res) => {
  // finds a Model object by ID (req.params.id), then edits that object's data (req.body)
  try {
      const update = await Thoughts.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      res.status(200).json(update);
  } catch (err) {
      res.status(500).json(err);
  }
});

// DELETE - finds Thought with matching '_id' matching parameter & deletes
router.delete('/:id', async (req, res) => {
  try {
    // checks if there's an ID equal to ":id" 
      const del = await Thoughts.findOneAndDelete(
          { _id: req.params.id }, 
      );
      res.json({ del });
  } catch(err) {
      console.log("D'oh!");
      console.log(err);
      res.status(400).json({err});
  }
});


// =========== REACTION ROUTES =========== //

// POST - new reaction in a thought's 'reactions' array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const reaction = req.body;

    // finds Thought via URL's 'thoughtId' value, then pushes Reaction values to the user's "reactions" array
    const updatedThought = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: 
        {
          reactions: reaction,
        }
      },
      { new: true },
    );
      res.json({ updatedThought });
  } catch(err) {
      console.log("D'oh!");
      console.log(err);
      res.status(400).json({err});
  }
});

// DELETE - removes a reaction by its reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const reactId = req.params.reactionId;

    // find user by 'thoughtId', then pull (delete) the reaction
    // before proceeding, DELETE EVERY REACTION, then push Reaction IDs only
    const deleteReactionfromThought = await Thoughts.updateOne(
      { _id: req.params.thoughtId },
      { $pull: 
        {
          reactions: 
          {
            reactionId: 
            {
              $in: [reactId]
            }
          }
        }
      },
    )

    res.json({deleteReactionfromThought});
  } catch(err) {
    console.log("D'OH!!");
    console.log(err);
    res.status(400).json({err});
  }
});


module.exports = router;
