import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({size = "md"}) => {
    const sizeClass = `loading-${size}`;
    return <span className={`loading loading-spinner ${sizeClass}`}></span>;
}

LoadingSpinner.prototype = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default LoadingSpinner;