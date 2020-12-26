import { mediaItemsRequest, getMediaItemsSuccess, getMediaItemsFailed } from "../../types/services";

export const mediaItemsList = () => {
    return (dispatch) => {
        dispatch({
            type: mediaItemsRequest
        })

        fetch('https://www.breakingbadapi.com/api/characters?limit=20').then(response => response.json())
        .then(data => {
            dispatch({
                type: getMediaItemsSuccess,
                payload: data
            })
        })
        .catch((error) => {
            dispatch({
                type: getMediaItemsFailed,
                payload: error.message
            })
        })
    };
};