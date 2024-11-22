import axios from "axios";

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const travelData = async (location) => {
  const options = {
    method: "POST",
    url: "https://travel-advisor.p.rapidapi.com/locations/v2/search",
    params: {
      currency: "USD",
      units: "km",
      lang: "en_US",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "9457f0eec1msha0ab45c45f03fafp1b3d9cjsn9c3be8e4084d",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
    data: {
      query: "chiang mai",
      updateToken: "",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchTouristPlaces = async (location, limit) => {
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
    params: {
      name: location,
      locale: "en-gb",
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching tourist places:", error);
  }
};

export const fetchPlaceLocation = async (location) => {
  const options = {
    method: "GET",
    url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
    params: { name: location },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching place location:", error);
    throw error;
  }
};

export const fetchHotels = async ({
  lat,
  lon,
  checkin_date,
  checkout_date,
  room_size,
}) => {
  const options = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
    params: {
      adults_number: room_size ?? "1",
      checkin_date: checkin_date,
      children_number: "1",
      locale: "en-gb",
      room_number: room_size ?? "1",
      units: "metric",
      filter_by_currency: "USD",
      longitude: lon,
      children_ages: "5,0",
      checkout_date: checkout_date,
      latitude: lat,
      order_by: "popularity",
      include_adjacency: "true",
      page_number: "0",
      categories_filter_ids: "class::2,class::4,free_cancellation::1",
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
};

export const fetchTouristPlacesByLocation = async () => {
  const options = {
    method: "GET",
    url: "https://opentripmap-places-v1.p.rapidapi.com/%7Blang%7D/places/autosuggest",
    params: {
      kinds: "foods",
      name: "don",
      format: "json",
      limit: "10",
      lon: "-70.65",
      radius: "5000",
      lat: "-33.437",
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching tourist places by location:", error);
  }
};
