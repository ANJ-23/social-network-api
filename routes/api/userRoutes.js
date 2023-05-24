const router = require("express").Router();
const { User } = require("../../models");
const { getAllUsers, getOneUser, createUser, } = require("../../controllers/userController");

// =========== USER ROUTES =========== //

// GET - finds all Users in database
router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ status: "success", payload: users });
    } catch(err) {
        res.status(400).json({err});
    }
})

// GET - finds one User in database
router.get("/:id", async (req, res) => {
    try {
        const user = await getOneUser(req.params.id);
        res.status(200).json({ status: "success", payload: user });
    } catch(err) {
        res.status(400).json({err});
    }
})

// POST - create new user with the object in the request
router.post('/', async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        res.json({ status: "success", payload: newUser });
    } catch(err) {
        res.status(400).json({err});
    }
});

// PUT - updates a user's data via user's Mongo ID
router.put('/:id', async (req, res) => {
    // finds a Model object by ID (req.params.id), then edits that object's data (req.body)
    try {
        const update = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // const update = await putUser(req.params.id);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
// DELETE - finds User with matching '_id' matching parameter & deletes
router.delete('/:id', async (req, res) => {
    try {
        const deleteUser = await User.findOneAndDelete(
            // checks if there's an ID equal to ":id" 
            { _id: req.params.id }, 
        );
        res.json({ deleteUser });
    } catch(err) {
        console.log("D'oh!");
        console.log(err);
        res.status(400).json({err});
    }
});


// =========== FRIEND ROUTES =========== //

// POST - new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        // finds user via URL's 'userId' value, then pushes 'friendId' value to the user's "friends" array
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: {friends: req.params.friendId} },
            { new: true },
        );
        res.json({ updatedUser });
    } catch(err) {
        console.log("D'oh!");
        console.log(err);
        res.status(400).json({err});
    }
});

// DELETE - removes a Friend in the User's 'friends' array via Friend's ID (userId)
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        friendId = req.params.friendId;

        // find user by 'userId', then pull (delete) their friend
        const deleteFriendfromUser = await User.updateOne(
            { _id: req.params.userId },
            { $pullAll: {friends: [req.params.friendId]}},
        )

        res.json({deleteFriendfromUser});
    } catch(err) {
        console.log("D'OH!!");
        console.log(err);
        res.status(400).json({err});
    }
});

module.exports = router;