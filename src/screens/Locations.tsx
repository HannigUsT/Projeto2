import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
  PermissionStatus,
} from 'expo-location';
import { useEffect, useState, useRef } from 'react';

export default function Location() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  const mapRef = useRef<MapView>(null);

  async function requestLocationPermissions() {
    const { status } = await requestForegroundPermissionsAsync();
    setPermissionStatus(status);

    if (status === 'granted') {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (permissionStatus === 'granted') {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          setLocation(response);
          mapRef.current?.animateCamera({
            center: response.coords,
          });
        }
      );
    }
  }, [permissionStatus]);

  const handleRetryPermission = () => {
    requestLocationPermissions();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha localização em tempo real</Text>
      {permissionStatus === 'granted' && location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
      {permissionStatus !== 'granted' && (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Permissão de localização não concedida.</Text>
          <TouchableOpacity style={styles.button} onPress={handleRetryPermission}>
            <Text style={styles.buttonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  permissionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3f51b5',
    paddingVertical: 10,
    borderRadius: 4,
  },
});
