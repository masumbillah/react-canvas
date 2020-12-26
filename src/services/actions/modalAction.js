import { openModalType } from "../../types/services";

export const openModal = (isOpen, item, component) => {
    return {
        isOpen,
        payload: item,
        component,
        type: openModalType
    }
};
