const { Thoughts, User } = require("../models");

const thoughtController = {
  getAllThoughts(req, res) {
    Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
    .populate({path: 'reactions',select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
        res.status(404).json({message: 'No thoughts with this ID'});
        return;
    }
    res.json(dbThoughtsData)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  createThought({ params, body }, res) {
    Thoughts.create(body)
    .then(({_id}) => {
        return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
    })
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'No thought with this ID'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => res.json(err)); 
  },

  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-___v')
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID'});
            return;
        }
            res.json(dbThoughtsData);
    })
    .catch(err => res.json(err));
  },

  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID'});
            return;
        }
        res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
  },

  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
  },

  ThoughtReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
    if (!dbThoughtsData) {
        res.status(404).json({message: 'No thoughts with this particular ID!'});
        return;
    }
    res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))

  }

};

module.exports = thoughtController;