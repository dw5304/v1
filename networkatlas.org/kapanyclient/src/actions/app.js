import fetch from 'cross-fetch'
import config from '../config'

const URL = config('REACT_APP_API_URL');

export const REQUEST_CABLES = 'REQUEST_CABLES'
const requestCables = (id) => {
  return {
    type: REQUEST_CABLES,
    id
  }
}

export const RECEIVE_CABLES = 'RECEIVE_CABLES'
const receiveCables = (id, json) => {
  return {
    type: RECEIVE_CABLES,
    id,
    cables: json,
    receivedAt: Date.now()
  }
}

function fetchCables(id) {
  return dispatch => {
    dispatch(requestCables(id))
    return fetch(`${URL}/cables`, {
      "mode": "no-cors"
    })
      .then(response => response.json())
      .then(json => dispatch(receiveCables(id, json)))
  }
}

function shouldFetchCables(state, id) {
  const cables = state.cables
  if (!cables) {
    return true
  } else if (cables) {
    return false
  } else {
    return cables
  }
}

export const fetchCablesIfNeeded = (id) => (dispatch, getState) => {
    if (shouldFetchCables(getState(), id)) {
      return dispatch(fetchCables(id))
    } else {
      return Promise.resolve()
    }
}

export const REQUEST_LANDINGPOINTS = 'REQUEST_LANDINGPOINTS'
const requestLandingPoints = (id) => {
  return {
    type: REQUEST_LANDINGPOINTS,
    id
  }
}

export const RECEIVE_LANDINGPOINTS = 'RECEIVE_LANDINGPOINTS'
const receiveLandingPoints = (id, json) => {
  return {
    type: RECEIVE_LANDINGPOINTS,
    id,
    landings: json,
    receivedAt: Date.now()
  }
}

function fetchLandingPoints(id) {
  return dispatch => {
    dispatch(requestLandingPoints(id))
    return fetch(`${URL}/landingpoints`, {
      "mode": "no-cors"
    })
      .then(response => response.json())
      .then(json => dispatch(receiveLandingPoints(id, json)))
  }
}

function shouldFetchLandingPoints(state, id) {
  const {landings} = state
  if (!landings) {
    return true
  } else if (landings) {
    return false
  } else {
    return landings
  }
}

export const fetchLandingPointsIfNeeded = (id) => (dispatch, getState) => {
    if (shouldFetchLandingPoints(getState(), id)) {
      return dispatch(fetchLandingPoints(id))
    } else {
      return Promise.resolve()
    }
}