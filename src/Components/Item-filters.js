import React, { useEffect, useState } from 'react';

const ItemFilter = ({img, isFilter, filters, optionsChange}) => {
     
    const [hueRotate, setHueRotate] = useState((!!filters && filters.hueRotate)? filters.hueRotate:"0");
     const [saturate, setSaturate] = useState((!!filters && filters.saturate)? filters.saturate:"100");
     const [brightness, setBrightness] = useState((!!filters && filters.brightness)? filters.brightness:"100");
     const [contrast, setContrast] = useState((!!filters && filters.contrast)? filters.contrast:"100"); 
     let filter = `brightness(${brightness}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) contrast(${contrast}%)`;
    
    useEffect(()=>{
        optionsChange && optionsChange({brightness, hueRotate, saturate, contrast})
    }, [brightness, hueRotate, saturate, contrast]);

    return ( 
        <div className={`${isFilter?'show':'hide'}`}>
        <div className="settings-body filter">
           
            <div className="settings-live-view">
                <div className="item-preview" style={{backgroundImage: `url(${img})`, filter}}> </div>
            </div>

            <div className="settings-bar">
                <label> 
                    <div className="filter-name"><i className="icon icon-contrast-drop-fill">&#xe805;</i></div>
                    <div className="filter-range-bar">
                        <input name="hueRotate" type="range" min="0" max="360" value={hueRotate} onChange={(e)=>setHueRotate(e.target.value)} step="1"/>
                    </div>
                    <div className="filter-range"> {hueRotate} deg</div>
                </label>

                <label> 
                    <div className="filter-name"><i className="icon icon-contrast-drop-line">&#xe806;</i></div>
                    <div className="filter-range-bar">
                        <input name="saturate" type="range" min="0" max="1000" value={saturate} onChange={(e)=>setSaturate(e.target.value)} step="1"/>
                    </div>
                    <div className="filter-range"> {saturate}%</div>
                </label>

                <label> 
                    <div className="filter-name"> <i className="icon icon-sun">&#xe804;</i> </div>
                    <div className="filter-range-bar">
                        <input name="brightness" type="range" min="0" max="200" value={brightness} onChange={(e)=>setBrightness(e.target.value)} step="1"/>
                    </div>    
                    <div className="filter-range"> {brightness}%</div>
                </label>

                <label> 
                    <div className="filter-name"><i className="icon icon-adjust">&#xe803;</i></div> 
                    <div className="filter-range-bar">
                        <input name="contrast" type="range" min="0" max="1000" value={contrast} onChange={(e)=>setContrast(e.target.value)} step="1"/>
                    </div>
                    <div className="filter-range"> {contrast}%</div>
                </label>
            </div>
        </div>
        </div>
    )   
};
 
  export default ItemFilter;