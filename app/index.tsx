import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

type Locations = {
  pickup_lat: number;
  pickup_lng: number;
  drop_lat: number;
  drop_lng: number;
};

const PriceComparison = () => {
  const [locations, setLocations] = useState<Locations>({
    pickup_lat: 0,
    pickup_lng: 0,
    drop_lat: 0,
    drop_lng: 0,
  });
  const [prices, setPrices] = useState({ uber: null, ola: null });

  const fetchPrices = async () => {
    try {
      const uberResponse = await axios.get(`https://api.uber.com/v1.2/estimates/price`, {
        params: {
          start_latitude: locations.pickup_lat,
          start_longitude: locations.pickup_lng,
          end_latitude: locations.drop_lat,
          end_longitude: locations.drop_lng,
        },
        headers: {
          Authorization: `Bearer YOUR_UBER_API_KEY`,
        },
      });

      const olaResponse = await axios.get(`https://devapi.olacabs.com/v1/products`, {
        params: {
          pickup_lat: locations.pickup_lat,
          pickup_lng: locations.pickup_lng,
          drop_lat: locations.drop_lat,
          drop_lng: locations.drop_lng,
          service_type: 'p2p',
          category: 'auto',
        },
        headers: {
          Authorization: `Bearer YOUR_OLA_API_KEY`,
        },
      });

      setPrices({
        uber: uberResponse.data.prices ? uberResponse.data.prices[0].estimate : 'Not available',
        ola: olaResponse.data.products ? olaResponse.data.products[0].estimate : 'Not available',
      });
    } catch (error) {
      console.error("Error fetching prices: ", error);
    }
  };

  const handleLocationSelect = (data, details, type) => {
    if (details && details.geometry && details.geometry.location) {
      setLocations(prev => ({
        ...prev,
        [`${type}_lat`]: details.geometry.location.lat,
        [`${type}_lng`]: details.geometry.location.lng,
      }));
    } else {
      console.error(`${type} location details are missing geometry or location. Full details:`, details);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price Comparison</Text>

      <GooglePlacesAutocomplete
        placeholder='Pickup Location'
        fetchDetails={true}
        onPress={(data, details = null) => handleLocationSelect(data, details, 'pickup')}
        query={{
          key: 'AIzaSyBtedOJ-p8uyxy1MVavPte8KdSNRE4Z41U',
          language: 'en',
        }}
        styles={autocompleteStyles}
        currentLocation={true}
        currentLocationLabel='Current location'
      />

      <GooglePlacesAutocomplete
        placeholder='Dropoff Location'
        fetchDetails={true}
        onPress={(data, details = null) => handleLocationSelect(data, details, 'drop')}
        query={{
          key: 'AIzaSyBtedOJ-p8uyxy1MVavPte8KdSNRE4Z41U',
          language: 'en',
        }}
        styles={autocompleteStyles}
        currentLocation={true}
        currentLocationLabel='Current location'
      />

      <Button title="Get Prices" onPress={fetchPrices} />

      {prices.uber && (
        <Text style={styles.priceText}>Uber Price: {prices.uber}</Text>
      )}
      {prices.ola && (
        <Text style={styles.priceText}>Ola Price: {prices.ola}</Text>
      )}
    </View>
  );
};

const autocompleteStyles = {
  textInputContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  priceText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default PriceComparison;
