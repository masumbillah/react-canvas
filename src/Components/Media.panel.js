// Packages
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { connect, useDispatch } from "react-redux";

//Redux methods
import { MediaItemTypes } from '../types';
import { mediaItemsList } from "../services/actions/mediaItemsAction";
import { addCanvasItem, selectedCanvasItem, updateCanvasItem } from "../services/actions/canvasItemsAction";

//App helpers
import AppHelpers from '../tools/App-helpers';

// Start left media panel item component
const Item = ({ char_id, img, name, onSelect, isSelected, isSelectCanvasItem }) => {
    const dispatch = useDispatch();
    const [{ isDragging }, drag] = useDrag({
        item: { char_id, name, img, type: MediaItemTypes.BOX },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
              dispatch(addCanvasItem(item));
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const changeItemSelectHandler = () => {
     if(isSelectCanvasItem) !!onSelect && onSelect({char_id, img, name});
    }

    return ( <div ref={drag}>
        <div className={`media-card ${(isSelected && isSelectCanvasItem)? "selected":""}`} onClick={()=>changeItemSelectHandler()} style={{backgroundImage: `url(${img})`}} title={name}></div>
    </div>)
};
// End left media panel item component

// Start media panel item container component
const MediaPanel = ({loading, mediaItems, error, selectedItem, canvasItems})=> { 
  const dispatch = useDispatch();
  const [selectLeftItem, setSelectLeftItem] = useState();
  const isSelectCanvasItem = !AppHelpers.isEmptyObj(selectedItem);
  const onSelectForChangeHandler = ({char_id, img}) => {
      setSelectLeftItem(img);
      mediaItems = mediaItems.map(item=>{
        if(item.char_id === char_id) item.isSelected = true;
        else item.isSelected = false;
        return item
      });
    };

  //Images change handler
  const onCancelSelectForChangeHandler = () => {
      mediaItems = mediaItems.map(item=>{ item.isSelected = false; return item });
  };

  //Images change handler
  const onConfirmSelectForChangeHandler = () => {
     const changeImg = selectLeftItem;
     const { id } = selectedItem;
     dispatch(updateCanvasItem(id, {img:changeImg}, canvasItems))
  }

    return ( 
      <div className="media-panel">
        <div className="media-panel-header"> Media panel </div>
        <div className={`media-items ${isSelectCanvasItem?'change-mode':''}`}>
            {loading? <div className="loading-message">Loading..</div> : mediaItems?.map((mediaItem, index) => 
              <div key={mediaItem.img} > <Item {...mediaItem} isSelectCanvasItem={isSelectCanvasItem} onSelect={(item)=>onSelectForChangeHandler(item)} /> </div>
            )}
        </div>
        <div className={`animate__animated animate__faster animate__slideInUp media-panel-footer ${(!!selectLeftItem && isSelectCanvasItem)? 'd-flex':'hide'}`} >
            <button className="btn btn-default" onClick={()=>onCancelSelectForChangeHandler()} > Cancel</button>
            <button className="btn btn-primary" onClick={()=>onConfirmSelectForChangeHandler()} > Confirm</button>
        </div>
      </div>
    );
  };

//Start redux dispatch for media panel
const mapStateToProps = (state) =>({
  loading: state.mediaItemsReducer.loading,
  mediaItems: state.mediaItemsReducer.mediaItems,
  error: state.mediaItemsReducer.error,
  canvasItems: state.canvasItemsReducer.canvasItems
});

const itemMapStateToProps = (state) =>({
  selectedItem: state.canvasItemsReducer.selectedCanvasItem
});

 let wrapMediaPanel = connect(itemMapStateToProps, {selectedCanvasItem, updateCanvasItem})(MediaPanel);
 export default connect(mapStateToProps, mediaItemsList())(wrapMediaPanel);

  
