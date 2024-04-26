export default function createNotification (id, ...args) {
  const notificationsList = [];
  for (let i = 0; i < args.length; i += 1) {
    const notificationContent = args[i];
    notificationsList.push({
      notification: notificationContent,
    });
  }
  return {
    id: id,
    notifications: notificationsList,
  };
}