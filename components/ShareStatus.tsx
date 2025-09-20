import React, { useState, useEffect } from 'react';

interface ShareStatusProps {
    status: 'sharing' | 'shared' | 'error' | 'idle';
}

const ShareStatus: React.FC<ShareStatusProps> = ({ status }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        switch(status) {
            case 'sharing':
                setMessage('Sharing your trip...');
                break;
            case 'shared':
                setMessage('Trip shared successfully!');
                break;

            case 'error':
                setMessage('Failed to share. Please try again.');
                break;
            default:
                setMessage('');
        }
    }, [status]);

    if (status === 'idle') return null;

    const baseClasses = "text-center p-2 rounded-md text-sm";
    const statusClasses = {
        sharing: "bg-blue-500/20 text-blue-300",
        shared: "bg-green-500/20 text-green-300",
        error: "bg-red-500/20 text-red-300",
        idle: ""
    }

    return (
        <div className={`${baseClasses} ${statusClasses[status]}`}>
            {message}
        </div>
    );
};

export default ShareStatus;
