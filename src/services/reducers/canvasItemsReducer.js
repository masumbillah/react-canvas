//Redux types
import {
    addCanvasItemType, 
    updateCanvasItemType, 
    resetCanvasItemsType, 
    removeCanvasItemType,
    selectedCanvasItemType 
} from "../../types/services";

//App helpers
import AppHelpers from "../../tools/App-helpers";

//Initial state
const initialState = {
    canvasItems: AppHelpers.getCollectionData() || [],
    selectedCanvasItem: {}
};

export default function (state = initialState, action) {
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
        case selectedCanvasItemType:
            return {
                ...state,
                selectedCanvasItem: action.payload
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

const updateItem = ( id, {filters, img}, allCanvasItems) => {

 let result = allCanvasItems.map(item=> {
        if(!!item && item.id === id) {
           if(filters) item.filters = filters;
           if(img) item.img = img
        }
        return item;
    });

  return updateLocalStorage(result);
};


const updateLocalStorage = (result) => {
    AppHelpers.setCollectionData(result);
    return result;
}