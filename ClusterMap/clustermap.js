var Main;

import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import Graphic from "https://js.arcgis.com/4.33/@arcgis/core/Graphic.js";
import FeatureLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/FeatureLayer.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import clusterPopupCreator from "https://js.arcgis.com/4.33/@arcgis/core/smartMapping/popup/clusters.js";
import clusterLabelCreator from "https://js.arcgis.com/4.33/@arcgis/core/smartMapping/labels/clusters.js";

const places = [
  {
    place: "Graduate School",
    latitude: 30.6210,
    longitude: -96.3255,
    city: "College Station",
    state: "Texas",
    country: "United States"
  },
  {
    place: "Fun Field Work",
    latitude: 41.5294,
    longitude: -109.4655,
    city: "Green River",
    state: "Wyoming",
    country: "United States"
  },
  {
    place: "Current Residence",
    latitude: 41.3104,
    longitude: -105.502,
    city: "Laramie",
    state: "Wyoming",
    country: "United States"
  },
  {
    place: "Place of Birth",
    latitude: 29.4252,
    longitude: -98.4946,
    city: "San Antonio",
    state: "Texas",
    country: "United States"
  },
  {
    place: "Favorite Climbing Trip",
    latitude: 42.8330,
    longitude: -108.7307,
    city: "Lander",
    state: "Wyoming",
    country: "United States"
  },
  {
    place: "Coolest Work Trip",
    latitude: 5.8559,
    longitude: 118.0722,
    city: "Sandakan",
    state: "Sabah",
    country: "Malaysia"
  },
];

const graphics = places.map((place, index) => {
  return new Graphic({
    geometry: {
      type: "point",
      longitude: place.longitude,
      latitude: place.latitude
    },
    attributes: {
      ObjectID: index + 1,
      place: place.place
    }
  });
});

const layer = new FeatureLayer({
  source: graphics,
  fields: [{
    name: "ObjectID",
    alias: "ObjectID",
    type: "oid"
  }, {
    name: "place",
    alias: "Place",
    type: "string"
  }],
  objectIdField: "ObjectID",
  geometryType: "point",
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: [255, 255, 0],
      outline: {
        color: [0, 0, 0],
        width: 1
      }
    }
  },
  popupTemplate: {
    title: "{Place}",
    content: "{City}, {State}, {Country}"
            }
});

Main = (function() {
    const map = new Map({
        basemap: "hybrid",
        ground: {
            layers: [layer]
         },
    });
    
 const view = new MapView({
  container: "map",
  map: map,
  center: [-100, 40],
  zoom: 4
popup: {
    dockEnabled: true,
    dockOptions: {
    position: "bottom-left",
    breakpoint: false
            }
        },
        
    });
 
// Enable clustering
async function enableClustering(layer) {
  const popupTemplate = await clusterPopupCreator
    .getTemplates({ layer })
    .then(res => res.primaryTemplate.value);

  const { labelingInfo, clusterMinSize } = await clusterLabelCreator
    .getLabelSchemes({ layer, view })
    .then(res => res.primaryScheme);

  layer.featureReduction = {
    type: "cluster",
    popupTemplate,
    labelingInfo,
    clusterMinSize
  };

  map.add(layer);
}

enableClustering(layer);

view.on("click", function (event) {
  view.goTo({
    target: event.mapPoint,
    zoom: 10
  });
});



    
