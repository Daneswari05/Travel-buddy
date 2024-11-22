import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  CalendarComponent,
  TouristLocationCard,
  HotelCard,
  ImageCarousel,
  InviteFriend,
} from "../components";

import { fetchImages } from "../services/unsplashApi";
import {
  fetchPlaceLocation,
  fetchTouristPlaces,
  fetchHotels,
} from "../services/rapidApi";
import { getTripById, deleteTrip } from "../services/tripApi";

const LOCATIONS = [
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Detroit",
  "Nashville",
];

const Explore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [touristPlaces, setTouristPlaces] = useState([]);

  const fetchTripDetails = async () => {
    setIsLoading(true);

    try {
      const touristPlaces = await fetchTouristPlaces(
        // random location
        LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        12
      );
      setTouristPlaces(touristPlaces);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTripDetails();
  }, []);
  useEffect(() => {
    // bring to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="container">Loading...</div>
      ) : (
        <div
          className="row"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem",
            gap: "2rem",
          }}
        >
          <h1>Tourist Places</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              width: "100%",
            }}
          >
            {touristPlaces?.map((location) => (
              <TouristLocationCard
                key={location?.dest_id}
                image={location?.image_url}
                description={location?.label}
                location={`${location?.region}, ${location?.country}`}
                name={location?.name}
                numHotels={location?.nr_hotels}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
