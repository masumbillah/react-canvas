import { addCanvasItemType, updateCanvasItemType, resetCanvasItemsType, removeCanvasItemType } from "../../types/services";
import AppHelpers from "../../tools/App-helpers";

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
        case resetCanvasItemsType:
            return {
                ...state,
                canvasItems: resetCanvasItems()
            }
        default:
            return state    
    }
};

//Helpers
const removeItem = (items, removeItemId) => {
   let result = items.filter(item=> item.id !==removeItemId);
   return updateLocalStorage(result);
};

const resetCanvasItems = () => {
   return updateLocalStorage([]);
};

const addItem = (existItems, newItem) => {
    let itemSize = existItems.length,
        id = AppHelpers.randomId();
        
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
    AppHelpers.setCollectionData(result);
    return result;
}