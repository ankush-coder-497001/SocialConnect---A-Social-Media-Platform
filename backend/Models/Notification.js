const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user receiving the notification
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who triggered the notification
  type: {
    type: String,
    enum: ['like', 'comment', 'follow', 'mention', 'message'], // Different types of notifications
    required: true,
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // Reference to the post (if applicable)
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // Reference to the comment (if applicable)
  message: String, // Custom message for the notification (optional)
  isRead: { type: Boolean, default: false }, // Whether the notification has been read
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
