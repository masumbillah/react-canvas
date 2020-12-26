import { addCanvasItemType, updateCanvasItemType, removeCanvasItemType } from "../../types/services";

const initialState = {
    canvasItems: JSON.parse(localStorage.getItem("canvasItems")) || []
};

export default function (state = initialState, action) {
    console.log(".....action", action);
    switch(action.type) {
        case addCanvasItemType:
            return {
                ...state,
                canvasItems: addItem(state.canvasItems, action.payload)
            }
        case updateCanvasItemType: 
            return {
                ...state,
                canvasItems: updateItem(action.id, action.payload, action.canvasItems)
            }
            case removeCanvasItemType: 
                return {
                    ...state,
                    canvasItems: removeItem(state.canvasItems, action.payload)
                }
        default:
            return state    
    }
};

//Helpers
const removeItem = (items, removeableItemId) => {
   let result = items.filter(item=> item.id !==removeableItemId);
   return updateLocalStorage(result);
};

const addItem = (existItems, newItem) => {
    let itemSize = existItems.length,
        id = itemSize+1;
        
    let result = [...existItems, {...newItem, id, filters: {
        brightness: "100",
        saturate: "100",
        hueRotate: "0",
        contrast: "100"
    }}];

   return updateLocalStorage(result);
}

const updateItem = ( id, filters, allCanvasItems) => {
 let result = allCanvasItems.map(item=> {
        if(!!item && item.id === id) {
            item.filters = filters;
        }
        return item;
    });

  return updateLocalStorage(result);
};


const updateLocalStorage = (result) => {
    localStorage.setItem('canvasItems', JSON.stringify(result));
    return result;
}