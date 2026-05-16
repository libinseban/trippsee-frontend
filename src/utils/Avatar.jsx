import React from 'react';

const Avatar = ({ user, size = 'md', onClick }) => {
    // Get first letter of name or email
    const getInitial = () => {
        if (!user?.name) return '?';
        return user.name[0].toUpperCase();
    };

    // Generate consistent background color based on name/email
    const getBackgroundColor = () => {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
        ];
        
        const identifier = user?.name || user?.email || '';
        const hash = identifier.split('')
            .reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        
        return colors[hash % colors.length];
    };

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg'
    };

    return (
        <div 
            onClick={onClick}
            className={`
                relative rounded-full overflow-hidden 
                flex items-center justify-center cursor-pointer
                ${sizeClasses[size]}
            `}
            style={{ backgroundColor: getBackgroundColor() }}
        >
            {user?.profilePicture ? (
                <img
                    src={user.profilePicture}
                    alt={user?.name || 'User'}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.style.display = 'none'}
                />
            ) : (
                <span className="text-white font-semibold">
                    {getInitial()}
                </span>
            )}
        </div>
    );
};

export default Avatar;