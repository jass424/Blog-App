const mongoose = require('mongoose');


const activitylogSchema = new mongoose.Schema({
   action: {
    type: String,
    required: true
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   targetType: {
    type: String
   },
   target:{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'targetType'
   },
   details:{
    type: String
   },
   createdAt:{
    type: Date,
    default: Date.now
   }
});

module.exports = mongoose.model('ActivityLog', activitylogSchema);