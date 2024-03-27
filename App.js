import React, { useRef, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import * as Location from "expo-location";

export default function App() {
  const [marker, setMarker] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const coords = await Location.geocodeAsync("Lviv");
        setMarker(coords[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const mapRef = useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsMyLocationButton
        showsUserLocation
      >
        {marker ? <Marker coordinate={marker} /> : null}
      </MapView>
      <Button
        onPress={() => {
          if (!mapRef.current) return;
          mapRef.current.animateCamera(
            {
              center: {
                latitude: 70.12587752425561,
                longitude: 80.097283609211445,
              },
              zoom: 10,
            },
            { duration: 1000 }
          );
        }}
        title="Region Change"
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column-reverse",
  },
  map: {
    width: "100%",
    height: "90%",
  },
});

