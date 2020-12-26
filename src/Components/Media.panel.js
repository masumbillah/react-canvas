import React from 'react';
import { useDrag } from 'react-dnd';
import { connect, useDispatch } from "react-redux";

import { MediaItemTypes } from '../types';
import { mediaItemsList } from "../services/actions/mediaItemsAction";
import { addCanvasItem } from "../services/actions/canvasItemsAction";

const Item = ({ char_id, img, name }) => {
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

    return (<div ref={drag}>
			<div className="media-card" style={{backgroundImage: `url(${img})`}} title={name}></div>  
		</div>);
};

const MediaPanel = ({loading, mediaItems, error})=> { 
    return ( 
      <div className="media-panel">
        <div className="media-panel-header"> Media panel </div>
        <div className="media-items">
            {loading? <div className="loading-message">Loading..</div> : mediaItems?.map((mediaItem, index) => 
              <div key={mediaItem.img} > <Item {...mediaItem} /> </div>
            )}
        </div>
      </div>
    );
  }

const mapStateToProps = (state) =>({
  loading: state.mediaItemsReducer.loading,
  mediaItems: state.mediaItemsReducer.mediaItems,
  error: state.mediaItemsReducer.error
});

export default connect(mapStateToProps, mediaItemsList())(MediaPanel);
  