import NotificationCard from '@/components/NotificationCard';
import React from 'react';

const Notification = () => {
    return (
        <div>
            <div className="max-w-lg mx-auto items-center h-screen">
                <h2>Notifications</h2>
                <NotificationCard notificationType='new request'/>
                <NotificationCard notificationType='new message'/>
                <NotificationCard notificationType='new'/>
            </div>
        </div>
    );
};

export default Notification;