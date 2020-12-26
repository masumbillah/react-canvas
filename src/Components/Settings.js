import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { updateCanvasItem } from '../services/actions/canvasItemsAction';
import { openModal } from '../services/actions/modalAction';

import ItemFilter from './Item-filters';
import ItemPreview from './Item-preview';

const Settings = ({id, img, name, filters, canvasItems}) => {
    const dispatch = useDispatch();
    const [isFilter, setIsFilter] = useState(false);
    const [previewImgStyle, setPreviewImgStyle] = useState(filters);
    const defaultFilter = {
        brightness: "100",
        saturate: "100",
        hueRotate: "0",
        contrast: "100"
    };
    const resetFilterHandler = () => {
        setPreviewImgStyle(defaultFilter);
        dispatch(updateCanvasItem(id, defaultFilter, canvasItems));
        dispatch(openModal())
    }

    return ( 
       <div className="settings-container">
           <div className="settings-header">
                <div onClick={()=> setIsFilter(false)} className={`menu ${!isFilter? 'active':''}`}>Change Image</div>
                <div onClick={()=> setIsFilter(true)} className={`menu ${isFilter? 'active':''}`}>Filter & Live</div>
           </div>
            <ItemPreview {...{id, img, name, isFilter, filters: previewImgStyle}} />
            <ItemFilter {...{id, img, name, isFilter, filters: previewImgStyle, optionsChange:(options)=>{ setPreviewImgStyle(options); dispatch(updateCanvasItem(id, options, canvasItems))}}} />
       
            <div className="settings-footer">
                <button className="btn btn-default" onClick={()=> dispatch(openModal())}>Close</button>
                { isFilter? <button className="btn btn-primary" onClick={()=>resetFilterHandler()}>Reset</button>:null }
           </div>
       </div>
    )
};

const mapStateToProps = (state) =>{
    return({
      canvasItems: state.canvasItemsReducer.canvasItems
    })
  };
export default connect(mapStateToProps, {updateCanvasItem, openModal})(Settings);