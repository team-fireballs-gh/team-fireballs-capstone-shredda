import React, { useState } from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function PlacesAutocomplete() {
    let [eventAddress, setEventAddress] = useState("");

    return (
        <GooglePlacesAutocomplete
        placeholder='Location'
        onPress={(data, details = null) => {
          console.log(data, details);
          console.log("DESCRIPTION", data.structured_formatting.main_text)
        }}
        selectProps={{
          eventAddress,
          onChange: setEventAddress
        }}
        query={{
          key: 'AIzaSyAcboHxUI2XRIfsHXv6GUNExGHAaAu8SZs',
          language: 'en',
          types:'establishment',
        }}
      />

    )
}