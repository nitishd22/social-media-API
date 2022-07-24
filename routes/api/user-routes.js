const router = require('express').Router();
const {
    getUsers,
    getUserById,
    createUser,
    createUser,
    deleteUserByID,
    addFriend,
    deleteFriend,
} = require("../../controllers/user-controller");

router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

router
    .route('/')
    .get(getUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .put(createUser)
    .delete(deleteUserByID)


 module.exports = router;