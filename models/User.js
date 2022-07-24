const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type:String,
    unique:true,
    required:"Username required",
    trim:true
},
email: {
    type:String,
    required:"Email required",
    unique:true,
    match: [/.+@.+\..+/]
},
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friend'
    }
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
const User = model("User", UserSchema);
module.exports = User;