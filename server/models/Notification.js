import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: 'unread',
    },
    userId: {
      type: String,
    //   ref: 'User', // Replace 'User' with the actual user schema name
      required: true,
    },
  });
  
 
  const Notification = mongoose.model("Notification", NotificationSchema);
  export default Notification;