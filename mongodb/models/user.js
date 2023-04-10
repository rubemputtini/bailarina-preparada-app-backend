import mongose from "mongoose";

const UserSchema = new mongose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allProperties: [{ type: mongose.Schema.Types.ObjectId, ref: "Property" }],
});

const userModel = mongose.model("User", UserSchema);

export default userModel;
