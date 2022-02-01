import {applyMiddleware, createStore, compose} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import sagas from '@sagas';
import rootReducer from '@reducers';
import {routerMiddleware} from 'connected-react-router';
import {appHistory} from '@services/HistoryConfig';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (window && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  middleware.push(logger);
}

middleware.push(routerMiddleware(appHistory));

const enhancer = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer(appHistory), enhancer);
sagaMiddleware.run(sagas);
