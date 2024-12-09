import mongoose from "mongoose";

const perSchema = new mongoose.Schema({
   module: {
      type: String,
   },
   permissions: {
      type: [String],
   },
});

const Permission = mongoose.model("Permission", perSchema);

export default Permission;
