const ActivityLog = require('../models/activitylog.model');

const logActivity = async ({ action, user, targetType, target, details }) => {
      console.log('Activity logged', { action, user, targetType, target, details })
 const result =  await ActivityLog.create({
    action,
    user,
    targetType,
    target,
    details
  });
 console.log('Activity logged successfully', result);
}

module.exports = logActivity;


