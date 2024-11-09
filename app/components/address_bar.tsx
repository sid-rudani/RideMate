// import React from 'react';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const GooglePlacesInput = () => {
//     return (
//         <GooglePlacesAutocomplete
//             placeholder='Search'
//             onPress={(data, details = null) => {
//                 // 'details' is provided when fetchDetails = true
//                 console.log(data, details);
//             }}
//             query={{
//                 key: 'AIzaSyBtedOJ-p8uyxy1MVavPte8KdSNRE4Z41U', // Replace with your API key
//                 language: 'en',
//             }}
//             styles={{
//                 textInputContainer: {
//                     width: '100%',
//                 },
//                 description: {
//                     fontWeight: 'bold',
//                 },
//                 predefinedPlacesDescription: {
//                     color: '#1faadb',
//                 },
//             }}
//             currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
//             currentLocationLabel='Current location'
//             fetchDetails={true} // Fetch details of the selected place
//         />
//     );
// };

// export default GooglePlacesInput;