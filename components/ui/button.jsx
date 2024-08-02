'use client'

import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Button({
    children,
    className,
    onClick,
    disabled,
    loading,
    size,
    color,
    ...rest
}) {
    const baseStyle = 'rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
    const sizeStyles = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-md',
        large: 'px-6 py-3 text-lg',
    };
    const colorStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
        success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={cn(
                baseStyle,
                sizeStyles[size],
                colorStyles[color],
                { 'opacity-50 flex items-center gap-3 cursor-not-allowed': disabled || loading },
                className,
            )}
            {...rest}
        >
            {loading && (
                <LoaderCircle className="animate-spin h-4 w-4 text-white" />
            )}
            {
                children
            }
        </button>
    );
}

Button.defaultProps = {
    onClick: () => { },
    disabled: false,
    loading: false,
    size: 'small',
    color: 'primary',
};
