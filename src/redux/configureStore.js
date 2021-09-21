import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

const configureStore = () => {
    return createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
};

export default configureStore;
