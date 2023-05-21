import Notification from "../models/Notification.js";

export const CreateNotification = async (req, res) => {
    try {
        // Retrieve the necessary data from the request body
        const { userId, message } = req.body;
    
        // Create a new notification document
        const notification = new Notification({
          message,
          userId,
        });
        // Save the notification to the database
        await notification.save();  
        res.status(201).json(notification);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create notification' });
      }
  };

  export const GetNotification = async (req, res) => {
    try {
      // Retrieve all notifications
      const notifications = await Notification.find();
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
  };
  

  export const ReadNotification = async (req, res) => {
    try {
      const { notificationId } = req.params;
  
      // Update the notification in the database to mark it as read
      await Notification.findByIdAndUpdate(notificationId, { status: 'read' });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to mark notification as read' });
    }
  };


  export const MakeNotificationsRead = async (req, res) => {
    try {
      // Find all notifications with status 'unread'
      const readNotifications = await Notification.find({ status: 'unread' });
  
      // Update each notification to mark it as 'read'
      const updatePromises = readNotifications.map(notification => {
        return Notification.findByIdAndUpdate(notification._id, { status: 'read' });
      });
  
      // Execute all update promises concurrently
      await Promise.all(updatePromises);
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update notifications' });
    }
  };
  