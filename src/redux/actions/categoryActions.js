import * as actionTypes from './actionTypes';

export const changeCategory = (category) => ({
    type: actionTypes.CHANGE_CATEGORY,
    payload: category,
});

export const getCategoriesSuccess = (categories) => ({
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
});

export function getCategories() {
    return function (dispatch) {
        let url = 'http://localhost:3005/categories';
        return fetch(url)
            .then((response) => response.json())
            .then((result) => {
                dispatch(getCategoriesSuccess(result));
            });
    };
}
