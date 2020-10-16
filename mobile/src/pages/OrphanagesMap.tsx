import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import mapMaker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  });
  
  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  };

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  };

  return (
    <View style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -23.6869281,
        longitude: -46.6222821,
        latitudeDelta: 0.808,
        longitudeDelta: 0.808,
      }} 
    >
      {orphanages.map(orphanage => {
        return (
          <Marker
          key={orphanage.id}
            icon={mapMaker}
            calloutAnchor={{
              x: 2.9,
              y: 0.9,
            }}
            coordinate={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
            }}
          >
            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>

    <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
      <RectButton 
        style={styles.createOrphanageButton}
        onPress={(handleNavigateToCreateOrphanage)}
      >
        <Feather name="plus" size={20} color="#FFF" />
      </RectButton>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 14,
    color: '#0089a5',
  },

  footer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    height: 56,
    paddingLeft: 24,
    borderRadius: 20,
    elevation: 3,
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8FA7B3',
  },

  createOrphanageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    backgroundColor: '#15C3D6',
    borderRadius: 20,
  },
});