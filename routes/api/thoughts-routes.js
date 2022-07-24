const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  updateThought,
  ThoughtReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller.js");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtById)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reaction").post(ThoughtReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;