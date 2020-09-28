import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"








const MyMapComponent = withScriptjs(withGoogleMap((props) =>


  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 25.0224928, lng: 67.11454 }}

  >

    {props.isMarkerShown && <Marker position={{ lat: 25.0224928, lng: 67.11454 }} draggable={true} onDragEnd={event => {
          const lat = event.latLng.lat()
          const lng = event.latLng.lng()
          
          console.log("event lat", event.latLng.lat())
          console.log("event lng", event.latLng.lng())
          
          fetch(`https://api.foursquare.com/v2/venues/search?client_id=112DZKAGOGWMLSVODY2ZMDW1CLCFJUSBYVNCP0VRROZOXPQW&client_secret=CPBNIRMLQ0NIVVKAQIISUFJH0IA0LHUMZ1Z2OHGDJD5JGOPS&v=20180323&ll=${lat},${lng}`
          )
          .then(res=>res.json())
          .then(res=>{
  
        
        console.log("mappp++++",res)
        console.log('ln and lt', lat,lng)
        
        props.getMapData(res,lat,lng)
})
    }
    
  
    }  />
    
    }
  </GoogleMap>
))

export default MyMapComponent;
