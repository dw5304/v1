import {RECEIVE_CABLES, RECEIVE_LANDINGPOINTS} from '../actions/app'
import {MapActionTypes} from '@mapbox/mapbox-gl-redux'

const initialState = {
  map: {
    bearing: 0,
    zoom: 1
  },
  app: {
    cables: [],
    landings: [],
    fetched: false,
    isFetching: false
  }
}

const reducer = (state = initialState, action) => {
  const map = action.map
  switch (action.type) {
    case RECEIVE_CABLES:
      return Object.assign({}, state, {
        app: {
          fetched: true,
          cables: action.cables
        }
      })
    case RECEIVE_LANDINGPOINTS:
      return Object.assign({}, state, {
        app: {
          fetched: true,
          landings: action.landings
        }
      })
    case MapActionTypes.zoom:
      return Object.assign({}, state, {
        map: {
          zoom: map.getZoom()
        }
      })
    default:
      return state
  }
}

export default reducer