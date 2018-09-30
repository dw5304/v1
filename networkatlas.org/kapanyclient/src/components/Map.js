import React, { Component } from 'react';
import MapGL, {Popup}  from 'react-map-gl'
import * as MapboxGLRedux from '@mapbox/mapbox-gl-redux'
import connect from 'react-redux/es/connect/connect'
import style from '../style.json'
import {fetchCablesIfNeeded, fetchLandingPointsIfNeeded} from '../actions/app'
import config from '../config'

const TOKEN = config('REACT_APP_MAPBOX_TOKEN');
const STYLE = `mapbox://styles/mapbox/${config('REACT_APP_MAPBOX_STYLE')}-v9`

const divStyle = {
  'fontSize': '10px'
}

class Map extends Component {
  state = {
    viewport: {
      width: 500,
      height: 500,
      latitude: 0,
      longitude: 0,
      zoom: 1
    },
    lngLat: [0, 0],
    features: []
  };

  _resize () {
    this._onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  _onViewportChange (viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    })
  }

  componentDidMount () {
    const { dispatch } = this.props;
    const map = this.mapRef.getMap()
    map.on('load', () => {
      dispatch(fetchCablesIfNeeded())
        .then(() => console.log('Cables loaded'))
      dispatch(fetchLandingPointsIfNeeded())
        .then(() => console.log('Landings loaded'))
      map.addControl(new MapboxGLRedux.ReduxMapControl('map'))

      map.loadImage('./network.png', (error, image) => {
        if (error) throw error;
        map.addImage('network', image);

        map.addSource('cables', {
          "type": "geojson",
          "data": "http://server.michogarcia.org/api/v1/cables"
        })

        map.addLayer( {
          "id": "cables-halo",
          "type": "line",
          "source": "cables",
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#888",
            "line-opacity": 1,
            "line-width": ["interpolate", ["linear"], ["zoom"],
              4, 3,
              10, 9,
              21, 13
            ]
          }
        })

        map.addLayer({
          "id": "cables",
          "type": "line",
          "source": "cables",
          "paint": {
            "line-color": {
              "property": "status",
              "stops": [
                [0, "red"],
                [1, "green"],
                [3, "yellow"],
              ]
            },
            "line-opacity": 0.8,
            "line-width": ["interpolate", ["linear"], ["zoom"],
              4, 2,
              10, 8,
              21, 12
            ]
          }
        });

        // map.addLayer({
        //   "id": "cables-network",
        //   "type": "line",
        //   "source": "cables",
        //   "paint": {
        //     "line-opacity": 0.8,
        //     "line-width": ["interpolate", ["linear"], ["zoom"],
        //       4, 4,
        //       10, 8,
        //       21, 12
        //     ],
        //     "line-pattern": "network"
        //   }
        // });

        // map.addLayer({
        //   "id": "cable-label",
        //   "type": "symbol",
        //   "source": "cables",
        //   "layout": {
        //     "symbol-placement": "line",
        //     "symbol-spacing": 500,
        //     "text-field": ["concat", ["get", "name"], "   -   ", ["get", "company"]],
        //     "text-keep-upright": false,
        //     "text-font": [
        //       "Open Sans Bold"
        //     ],
        //     "text-size": 12,
        //     "text-max-angle": 80,
        //     "icon-allow-overlap": false,
        //     "text-allow-overlap": false,
        //     "text-optional": true
        //   },
        //   "paint": {
        //     "text-color": "#fff",
        //     "text-halo-color": "#000",
        //     "text-halo-width": 1
        //   }
        // })
      })
    })
    this._resize()
  }

  shouldComponentUpdate(nextProps) {
    const map = this.mapRef.getMap();
    if(nextProps.app.cables !== this.props.app.cables || nextProps.app.landings !== this.props.app.landings) {
      this.loadStyle(map)
    }
    return true;
  }

  loadStyle (map) {
    const sourceIds = Object.keys(style.sources)
    for (let i = 0; i < sourceIds.length; i++) {
      let sourceId = sourceIds[i]
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, style.sources[sourceId])
      }
    }
    for (let i = 0; i < style.layers.length; i++) {
      if (!map.getLayer(style.layers[i])) {
        map.addLayer(style.layers[i])
      }
    }
  }

  /**
   * On hover show cable status using this filter
   * {
   *       "property": "status",
   *        "stops": [
   *        [0, "red"],
   *         [1, "green"]
   *       ]
   *     }
   * @param evt
   * @private
   */
  _onHover (evt) {
    const map = this.mapRef.getMap();
    if (map.isStyleLoaded()) {
      const cables = evt.features.filter(feature => feature.layer.id === 'cables')
      if (cables.length > 0) {
        const { lngLat, features } = evt;
        this.setState({
          lngLat, features
        })
      } else {
        this.setState({
          lngLat: [0, 0],
          features: []
        })
      }
    }
  }

  _createBeautyHTMLFromFeature (feature) {
    const { name, status, company } = feature.properties;
    const fields = {
      name, company, status
    }

    const returnStatus = (status) => {
      if (status === 1) {
        return 'Online'
      } else if (status === 0) {
        return 'Offline'
      } else if (status === 3) {
        return 'Cable Damaged'
      }
    }
    const rows = Object.keys(fields).map((key) => {
      const row = (cell1, cell2) => (cell2) ? <tr key={key}><td>{cell1}</td><td>{`: ${cell2}`}</td></tr> : ''
      return row(key, (key === 'status') ? returnStatus(fields[key]) : fields[key])
    })
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>);
  }

  _renderPopup () {
    const {lngLat, features} = this.state

    if (features.length === 0) {
      return null
    }

    return (<Popup latitude={lngLat[1]} longitude={lngLat[0]} closeButton={false} closeOnClick={true} anchor="top">
      <div style={divStyle}>{this._createBeautyHTMLFromFeature(features[0])}</div>
    </Popup>)
  }

  render () {
    const { viewport } = this.state;
    console.log('rendered')
    return (<MapGL mapStyle={STYLE}
                   {...viewport}
                   mapboxApiAccessToken={TOKEN}
                   onViewportChange={this._onViewportChange.bind(this)}
                   onHover={this._onHover.bind(this)}
                   ref={ map => { this.mapRef = map } } >
      {this._renderPopup()}
    </MapGL>)
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, '')(Map);
