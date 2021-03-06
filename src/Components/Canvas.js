//Packages
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { connect, useDispatch } from "react-redux";

//Redux
import { addCanvasItem, removeCanvasItem, resetCanvasItems } from '../services/actions/canvasItemsAction';
import { openModal } from '../services/actions/modalAction';
import { MediaItemTypes, CanvasItemTypes } from '../types';

//Components
import Modal from '../tools/Modal';
import Settings from '../Components/Settings'
import AppHelpers from "../tools/App-helpers";

//Start canvas Item component
const CanvasItem = ({ id, name, img, filters, index, moveCard }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
          accept: CanvasItemTypes.CARD,
          hover(item, monitor) {
              if (!ref.current) {
                  return;
              }
              const dragIndex = item.index;
              const hoverIndex = index;
              if (dragIndex === hoverIndex) {
                  return;
              }
              const hoverBoundingRect = ref.current?.getBoundingClientRect();
              const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
              const clientOffset = monitor.getClientOffset();
              const hoverClientY = clientOffset.y - hoverBoundingRect.top;
              if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                  return;
              }
              if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                  return;
              }
              moveCard(dragIndex, hoverIndex);
              item.index = hoverIndex;
          },
      });

      const [{ isDragging }, drag] = useDrag({
          item: { type: CanvasItemTypes.CARD, id, index },
          collect: (monitor) => ({
              isDragging: monitor.isDragging(),
          }),
      });

      drag(drop(ref));
      const {brightness, hueRotate, saturate, contrast } = filters;
      let filterStyle= `brightness(${brightness}%) hue-rotate(${hueRotate}deg) saturate(${saturate}%) contrast(${contrast}%)`;

    //Open setting options handler
    const settingsOptionsHandler =() => {
      dispatch(openModal(true, { id, name, img, filters}, <Settings {...{id, img, name, filters}} />))
    };

    //Item delete handler
    const itemDeleteHandler =() => {
        let isSure = window.confirm("Are you sure?");
        if(isSure) dispatch(removeCanvasItem(id));
    };

  return (
    <div className="media-item-box" ref={ref} >
      <div className="media-item" style={{backgroundImage: `url(${img})`, filter: filterStyle}} title={name}> </div>
        <div className="item-settings">
        <span onClick={()=>settingsOptionsHandler()}>
          <i className="icon icon-settings">&#xe800;</i>
          </span>
          <span onClick={()=>itemDeleteHandler()}>
            <i className="icon icon-trash">&#xe802;</i>
          </span>
        </div>
    </div>
   );
};
//End canvas item component

///Start canvas component 
const Canvas = ({demoCanvasItems, isOpenMdal, modalComponent}) => {
    const dispatch = useDispatch()
    const textAreaRefForCopy = useRef(null);
    const [canvasItems, setCanvasItems] = useState([])
    const [copyContent, setCopyContent] = useState("")
    const [isCopied, setIsCopied] = useState(false)

    useEffect(()=>{
      setCanvasItems(demoCanvasItems)
    }, [demoCanvasItems])

    //React dnd methods
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: MediaItemTypes.BOX,
        drop: () => ({ name: 'Canvas' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const isActive = (canDrop && isOver) || canvasItems.length;
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      const dragCard = canvasItems[dragIndex];
      setCanvasItems(update(canvasItems, { $splice: [ [dragIndex, 1], [hoverIndex, 0, dragCard], ]}));
      AppHelpers.setCollectionData(canvasItems);
    }, [canvasItems]);

    //Content copy handler
    const contentCopyHandler = () => {
        let canvasEl = document.getElementById('js-canvas-content');
        let canvasElOuterHTML = canvasEl && canvasEl.outerHTML?canvasEl.outerHTML:'';
        if(canvasElOuterHTML) setCopyContent(`${AppHelpers.getCopyStyles()} <div class="canvas"> <div class="canvas-page-box"> ${ canvasElOuterHTML}</div></div>`);
        setIsCopied(true);

        setTimeout(() => {
          textAreaRefForCopy.current.select();
          document.execCommand('copy');
          setIsCopied(false);
        }, 1000);
    };

    //Reset canvas items handler
    const resetCanvasHandler = () => {
       if(canvasItems.length>0 && window.confirm("Are you sure? It will be delete forever!")) {
           AppHelpers.setCollectionData([]);
           setCanvasItems([]);
           dispatch(resetCanvasItems()); 
       }
    };

    return (
      <div className={`canvas ${isOpenMdal?'open-modal':''}`}>
        <Modal content={modalComponent} />

        <div className="canvas-header" style={{opacity: canvasItems.length>0?1:0}}>
              <div className="canvas-title">Canvas title...</div>
              <textarea className="copy-content-field" ref={textAreaRefForCopy} value={copyContent} readOnly />
              <button data-testid="js-copy-button" className={`btn btn-default ${isCopied? 'primary-color':''}`} onClick={()=> contentCopyHandler()}>{isCopied?'Copied!':'Copy'}</button>
              <button disabled={true} className="disabled btn btn-primary" onClick={()=> console.log("save event")}>Save</button>
              <button className="btn btn-danger" onClick={()=>resetCanvasHandler()}>Reset & Create new</button>
        </div>
        <div ref={drop} className={`canvas-page-box ${!isActive? 'empty':''}`}>
          {
            !isActive? <div className="empty-box"> <img src={'/icons/placeholder-icon.png'} alt="" /> <p>Drop an image from media panel!</p> </div>:<div id="js-canvas-content" className="canvas-area">
            {canvasItems?.map((canvasItem, index) =><React.Fragment key={index} > <CanvasItem {...canvasItem} index={index} moveCard={moveCard} /> </React.Fragment>)}</div>
          }
        </div>
      </div>
    );
};

//Redux dispatch for Media panel component
const mapStateToProps = (state) =>{
  return({
    demoCanvasItems: AppHelpers.getCollectionData(),
    isOpenMdal: state.modalReducer.isOpenModal,
    modalComponent: state.modalReducer.component
  })
};

//Redux dispatch for Canvas item component
const itemMapStateToProps = (state) =>{
  return({
    isOpenModal: state.modalReducer.isOpenModal,
  })
};

connect(itemMapStateToProps, {openModal})(CanvasItem);
export default connect(mapStateToProps, {addCanvasItem, resetCanvasItems, removeCanvasItem, openModal})(Canvas);
