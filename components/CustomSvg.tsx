import React from 'react';

interface CustomSvgProps {
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
    viewBox?: string;
}

const CustomSvg: React.FC<CustomSvgProps> = ({
    width = 273,
    height = 1108,
    fill = "white",
    className = "",
    viewBox = "0 0 273 1108"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* 
        PASTE YOUR SVG PATH HERE
        Replace this comment with your <path> element
        Example:
        <path d="YOUR_PATH_DATA_HERE" fill={fill} />
      */}
            <path
                d="YOUR_PATH_DATA_GOES_HERE"
                fill={fill}
            />
        </svg>
    );
};

export default CustomSvg;
