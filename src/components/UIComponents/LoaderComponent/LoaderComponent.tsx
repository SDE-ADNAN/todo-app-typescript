import React from 'react';
import './LoaderComponent.scss';

const LoaderComponent: React.FC = () => {

    return (
        <div className="loader-backdrop">
            <div className="loader-container">
                <div className="ios-gear-loading" />
                <p>Loading...</p>
            </div>
        </div>
    );
};

export default LoaderComponent;
