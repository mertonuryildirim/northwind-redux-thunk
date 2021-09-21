import * as actionTypes from './actionTypes';

export const getProductsSuccess = (products) => ({
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    payload: products,
});

export const createProductsSuccess = (product) => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product,
});

export const updateProductsSuccess = (product) => ({
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
});

export function getProducts(categoryId) {
    return function (dispatch) {
        let url = 'http://localhost:3005/products';
        if (categoryId) {
            url = url + '?categoryId=' + categoryId;
        }
        return fetch(url)
            .then((response) => response.json())
            .then((result) => dispatch(getProductsSuccess(result)));
    };
}

export function saveProduct(product) {
    return function (dispatch) {
        return saveProductApi(product)
            .then((savedProduct) => {
                product.id
                    ? dispatch(updateProductsSuccess(savedProduct))
                    : dispatch(createProductsSuccess(savedProduct));
            })
            .catch((err) => {
                throw err;
            });
    };
}

export function saveProductApi(product) {
    return fetch('http://localhost:3005/products/' + (product.id || ''), {
        method: product.id ? 'PUT' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(product),
    })
        .then(handleResponse)
        .catch(handleError);
}

export async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    const error = await response.text();
    throw new Error(error);
}

export function handleError(error) {
    console.error('Bir hata oluştu');
    throw error;
}
