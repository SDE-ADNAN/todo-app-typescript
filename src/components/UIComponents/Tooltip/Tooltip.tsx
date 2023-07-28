import React, { FC, useEffect, useState } from 'react';
import './Tooltip.scss';

interface TooltipProps {
    id: string;
    darkMode?: boolean;
    tooltipText: string;
}

const Tooltip: FC<TooltipProps> = ({ id, darkMode = true, tooltipText }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipStyle = darkMode ? 'tooltip-dark' : 'tooltip-light';

    useEffect(() => {
        const targetElement = document.getElementById(id);

        const handleMouseEnter = () => {
            setShowTooltip(true);
        };

        const handleMouseLeave = () => {
            setShowTooltip(false);
        };

        if (targetElement) {
            targetElement.addEventListener('mouseenter', handleMouseEnter);
            targetElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (targetElement) {
                targetElement.removeEventListener('mouseenter', handleMouseEnter);
                targetElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [id]);

    const tooltipContainerStyle = {
        zIndex: showTooltip ? 9999 : -1, // Set a high z-index when the tooltip is visible
    };

    return (
        <div className={`tooltip ${tooltipStyle} ${showTooltip ? 'visible' : 'visible'}`} style={tooltipContainerStyle}>
            <span className="tooltip-text">{tooltipText}</span>
        </div>
    );
};

export default Tooltip;
