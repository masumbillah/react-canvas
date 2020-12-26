import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { updateCanvasItem, selectedCanvasItem } from '../services/actions/canvasItemsAction';
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

    useEffect(()=>{

        if(!isFilter) dispatch(selectedCanvasItem({id, img, name, isFilter, filters: previewImgStyle}));
        else dispatch(selectedCanvasItem({}));

    }, [isFilter]);

    const resetFilterHandler = () => {
        setPreviewImgStyle(defaultFilter);
        dispatch(updateCanvasItem(id, {filters:defaultFilter}, canvasItems));
        dispatch(openModal())
    }

    const modalCloseHandler = () => {
        dispatch(selectedCanvasItem({}));
        dispatch(openModal())
    }

    const currentItem = () => {
      return canvasItems.find(item=> item.id === id);
    }

    return ( 
       <div className="settings-container">
           <div className="settings-header">
                <div onClick={()=> setIsFilter(false)} className={`menu ${!isFilter? 'active':''}`}>Change Image</div>
                <div onClick={()=> setIsFilter(true)} className={`menu ${isFilter? 'active':''}`}>Filter & Live</div>
           </div>
            <ItemPreview {...{id:currentItem().id, img:currentItem().img, isFilter, filters: previewImgStyle}} />
            <ItemFilter {...{id:currentItem().id, img:currentItem().img, isFilter, filters: previewImgStyle, optionsChange:(options)=>{ setPreviewImgStyle(options); dispatch(updateCanvasItem(id, {filters:options}, canvasItems))}}} />
       
            <div className="settings-footer">
                <button className="btn btn-default" onClick={()=> modalCloseHandler()}>Close</button>
                { isFilter? <button className="btn btn-danger" onClick={()=>resetFilterHandler()}>Reset</button>:null }
           </div>
       </div>
    )
};

const mapStateToProps = (state) =>{
    return({
      canvasItems: state.canvasItemsReducer.canvasItems
    })
  };
export default connect(mapStateToProps, {updateCanvasItem, openModal, selectedCanvasItem})(Settings);