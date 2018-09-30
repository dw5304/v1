import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers/app'

const mapMiddleware = MapboxGLRedux.mapMiddleware

export default () => {
  return createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware,
      mapMiddleware
    )
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}