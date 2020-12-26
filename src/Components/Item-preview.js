import React from 'react';

const ItemPreview = ({img, isFilter, filters}) => {

    const {brightness, hueRotate, saturate, contrast } = filters;
    let filterStyle= `brightness(${brightness}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) contrast(${contrast}%)`;
   
    return ( 
        <div className={`animate__animated animate__faster animate__fadeIn ${isFilter?'hide':'show'}`}>
            <div className="settings-body">
                <div className="item-preview" style={{backgroundImage: `url(${img})`, filter:filterStyle}}> </div>
                <div className="change-hints"> <strong> Note: </strong> Please select an image from media panel. If you want to change!</div>
            </div>
        </div>
    )
};
 
export default ItemPreview;