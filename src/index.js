import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import indexReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import "regenerator-runtime/runtime";
import {
  plantWatches,
  waterTowerUpgradeWatches,
  waterTowerWatches,
  harvestPLantWatches,
  buyJointWatches,
  motaPoolDeposit
} from "./reducers/indexSaga";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(indexReducer, applyMiddleware(sagaMiddleware));

function* rootSaga() {
  yield all([
    ...plantWatches,
    ...waterTowerUpgradeWatches,
    ...waterTowerWatches,
    ...harvestPLantWatches,
    ...buyJointWatches,
    ...motaPoolDeposit
  ]);
}
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
