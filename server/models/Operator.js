import mongoose from "mongoose";

const OperatorSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
    },
    { timestamps: true }
  );
  
 
  const Operator = mongoose.model("Operator", OperatorSchema);
  export default Operator;
