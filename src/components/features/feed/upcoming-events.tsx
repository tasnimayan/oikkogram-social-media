export const UpcomingEvents = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-3">Upcoming Events</h3>
      <div className="space-y-3">
        <div className="border-b pb-3 border-gray-100 dark:border-gray-700">
          <p className="font-medium">Community Garden Cleanup</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Tomorrow, 10:00 AM</p>
        </div>
        <div className="border-b pb-3 border-gray-100 dark:border-gray-700">
          <p className="font-medium">Neighborhood Watch Meeting</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">May 15, 7:00 PM</p>
        </div>
        <div>
          <p className="font-medium">Summer Block Party Planning</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">May 20, 6:30 PM</p>
        </div>
      </div>
      <button className="w-full mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View all events</button>
    </div>
  );
};
