import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.33/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.33/@arcgis/core/Graphic.js";
import FeatureLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/FeatureLayer.js";

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
  }
];

const graphics = places.map((place, index) => new Graphic({
  geometry: {
    type: "point",
    latitude: place.latitude,
    longitude: place.longitude
  },
  attributes: {
    ObjectID: index + 1,
    place: place.place,
    city: place.city,
    state: place.state,
    country: place.country
  }
}));

const layer = new FeatureLayer({
  source: graphics,
  objectIdField: "ObjectID",
  geometryType: "point",
  fields: [
    { name: "ObjectID", type: "oid" },
    { name: "place", type: "string" },
    { name: "city", type: "string" },
    { name: "state", type: "string" },
    { name: "country", type: "string" }
  ],
  popupTemplate: {
    title: "{place}",
    content: "{city}, {state}, {country}"
  },
  renderer: {
    type: "simple",
    symbol: {
      type: "simple-marker",
      color: "yellow",
      size: 5,
      outline: {
        color: "black",
        width: 2
      }
    }
  },
  featureReduction = {
        type: "cluster",
        clusterMinSize: 16.5,
        clusterMaxSize: 20,
        labelingInfo: [
          {
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')",
            },
            symbol: {
              type: "text",
              color: "white",
              font: {
                family: "Noto Sans",
                size: "12px",
              },
            },
            labelPlacement: "center-center",
          },
        ],
      },

const map = new Map({
  basemap: "hybrid",
  layers: [layer]
});

const view = new MapView({
  container: "map",
  map: map,
  center: [-100, 40],
  zoom: 3
});
