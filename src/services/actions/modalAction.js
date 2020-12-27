//Redux types
import { openModalType } from "../../types/services";

//Start modal actions
export const openModal = (isOpen, item, component) => {
    return {
        isOpen,
        payload: item,
        component,
        type: openModalType
    }
};
