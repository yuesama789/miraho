import React from 'react';
import './Badge.modules.scss';

interface BadgeProps {
    children: React.ReactNode;
    color?: 'gray' | 'blue' | 'purple' | 'green' | 'yellow' | 'red';
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    color = 'gray',
    className = '',
}) => {
    
    const colorClasses = {
        gray: 'bg-gray-100 text-gray-800',
        blue: 'bg-blue-100 text-blue-800',
        purple: 'bg-purple-100 text-purple-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        red: 'bg-red-100 text-red-800',
    };

    const classes = `badge ${colorClasses[color]} ${className}`;

    return (
        <span className={classes}>
            {children}
        </span>
    );
};

export default Badge;
