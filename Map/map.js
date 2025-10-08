var Main;

import Map from "https://js.arcgis.com/4.33/@arcgis/core/Map.js";
import Graphic from "https://js.arcgis.com/4.33/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/GraphicsLayer.js";
import ElevationLayer from "https://js.arcgis.com/4.33/@arcgis/core/layers/ElevationLayer.js";
import SceneView from "https://js.arcgis.com/4.33/@arcgis/core/views/SceneView.js";
import Search from "https://js.arcgis.com/4.33/@arcgis/core/widgets/Search.js";


Main = (function() {
    const layer = new ElevationLayer({
        url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
    });
    const map = new Map({
        basemap: "hybrid",
        ground: {
            layers: [layer]
         },
    });
    
    const view = new SceneView({
        container: "map",
        viewingMode: "local",
        map: map,
        camera: {
            position: {
                x: -11.875182,
                y: 40.243695,
                z: 40000000,
                spatialReference: {
                    wkid: 4326
    
                }
            },
            heading: 0,
            tilt: 0
        },
        popup: {
            dockEnabled: true,
            dockOptions: {
                position: "bottom-left",
                breakpoint: false
            }
        },
        
    });

view.on("click", function(event) {
        view.goTo({
            target: event.mapPoint,
            zoom: 10
        });
 });

    const initMap = function(){
                          
        const graphicsLayer = new GraphicsLayer();               
        map.add(graphicsLayer);

        for (const [key, value] of Object.entries(myStuff)){                       
            console.log(key, value)
                        
            const point = {                        
                type: "point",                             
                x: value.coord[0],                        
                y: value.coord[1],                            
                z: 10000                          
            };
                                
            const markerSymbol = {                            
                type: "simple-marker",                             
                color: [255, 255, 0],         //change rgb values                   
                outline: {
                              
                    // autocasts as new SimpleLineSymbol()                              
                    color: [0, 0, 0],                             
                    width: 2
                            
                }
                          
            };
                                                
            const pointGraphic = new Graphic({                            
                geometry: point,                            
                symbol: markerSymbol,                            
                popupTemplate: {                                
                    title: key + ": " + value.city + ", " + value.state + ", " + value.country        //this makes popup template                   
                }                  
            });
                          
            graphicsLayer.add(pointGraphic);
                    
                    
        }
                                    
    }
const searchWidget = new Search({
  view: view
});

view.ui.add(searchWidget, {
  position: "top-left",
  index: 2
});

    initMap()
                
    return {};

            
})();



    
