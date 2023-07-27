import React from 'react';
import './GlassmorphicBackground.scss';

interface GlassmorphicBackgroundProps {
    children: React.ReactNode;
}

const GlassmorphicBackground: React.FC<GlassmorphicBackgroundProps> = ({ children }) => {
    return (
        <div className="glassmorphic-background">
            {children}
        </div>
    );
};

export default GlassmorphicBackground;
