import { 
    addCanvasItemType,
     updateCanvasItemType, 
     resetCanvasItemsType, 
     removeCanvasItemType,  
     selectedCanvasItemType
    } from "../../types/services";

export const addCanvasItem = (item, canvasItems) => {
    return {
        payload: item,
        canvasItems,
        type: addCanvasItemType
    }
};

export const updateCanvasItem = (id, options, canvasItems) => {
    return {
        id: id,
        payload: options,
        canvasItems,
        type: updateCanvasItemType
    }
};

export const removeCanvasItem = (item) => {
    return {
        payload: item,
        type: removeCanvasItemType
    }
};

export const resetCanvasItems = () => {
    return {
        type: resetCanvasItemsType
    }
};

export const selectedCanvasItem = (item) => {
    return {
        payload:item,
        type: selectedCanvasItemType
    }
};