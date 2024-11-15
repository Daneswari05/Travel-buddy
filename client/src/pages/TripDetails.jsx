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

const TripDetails = () => {
  const [trip, setTrip] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [touristPlaces, setTouristPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (trip?.createdBy === user?._id) {
      navigate(`/trips/${id}/edit`);
    } else {
    }
  };
  const handleDelete = () => {
    if (trip?.createdBy === user?._id) {
      deleteTrip(id)
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.error("Error deleting trip:", error);
        });
    } else {
    }
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      setIsLoading(true);

      try {
        const trip = await getTripById(id);
        setTrip(trip);

        const images = await fetchImages(trip.destination);
        const touristPlaces = await fetchTouristPlaces(trip.destination);
        if (touristPlaces?.length > 0) {
          // convert date into yyyy-mm-dd format
          const checkin_date = new Date(trip.startDate)
            .toISOString()
            .split("T")[0];
          const checkout_date = new Date(trip.endDate)
            .toISOString()
            .split("T")[0];

          const fetchedHotels = await fetchHotels({
            lat: touristPlaces[1]?.latitude,
            lon: touristPlaces[1]?.longitude,
            // format date in yyyy-mm-dd without timezone
            checkin_date: checkin_date,
            checkout_date: checkout_date,
            room_size:
              // convert to string
              trip?.roomSize?.toString() ?? "1",
          });
          setHotels(fetchedHotels);
        }
        setImages(images);
        setTouristPlaces(touristPlaces);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);
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
            // display grid of 2 col 1 row
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: "2rem",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className="inner-container"
            style={{
              padding: "2rem",
              gap: "2rem",
              minWidth: "60%",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <div className="row" style={{ width: "100%" }}>
              <div
                className="inner-container"
                style={{ alignItems: "flex-start" }}
              >
                <h1>{trip?.name}</h1>
                <p>{trip?.description}</p>
              </div>
              <div className="row">
                <button onClick={handleEdit}>Edit</button>
                <InviteFriend />
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Event Details</h1>
              <div className="row" style={{ gap: "2rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {[
                    {
                      label: "Start Date",
                      value: trip?.startDate
                        ? // format to readabke date
                          new Date(trip?.startDate).toDateString()
                        : "",
                    },
                    {
                      label: "End Date",
                      value:
                        // format to readabke date
                        trip?.endDate
                          ? new Date(trip?.endDate).toDateString()
                          : "",
                    },
                    { label: "Created By", value: trip?.createdBy },
                    {
                      label: "Invited friends",
                      value: trip?.invitations?.join(", "),
                    },
                    { label: "Total days", value: `${trip?.totalDays} Days` },
                    { label: "Cost for each", value: trip?.cost },
                  ].map(({ label, value }) => (
                    <div
                      className="glass-effect"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "flex-start",
                        padding: "1rem",
                        borderRadius: "0.5rem",
                        width: "100%",
                      }}
                      key={label}
                    >
                      <h2>{label}</h2>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Tourist Places</h1>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                  width: "100%",
                }}
              >
                {touristPlaces?.slice(0, 3).map((location) => (
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
            <div
              className="inner-container"
              style={{ alignItems: "flex-start", width: "100%" }}
            >
              <h1>Gallery</h1>
              {images?.length > 0 && <ImageCarousel images={images} />}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem",
              borderLeft: "1px solid #64ccc5",
              height: "100%",
              alignItems: "center",
            }}
          >
            <div
              className="inner-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h1>Trip Duration</h1>
              <div>
                <CalendarComponent
                  startDate={trip.startDate}
                  endDate={trip.endDate}
                />
              </div>
            </div>
            {hotels?.length > 0 && (
              <div
                className="inner-container"
                style={{ alignItems: "flex-start", gap: "1rem" }}
              >
                <h1>Hotels Nearby for trip</h1>
                {hotels?.slice(0, 4).map((hotel) => (
                  <HotelCard
                    key={hotel?.hotel_name}
                    hotelName={hotel?.hotel_name}
                    address={hotel?.address}
                    reviewScore={hotel?.review_score}
                    price={hotel?.min_total_price}
                    imageURL={hotel?.max_photo_url}
                    websiteURL={hotel?.url}
                    zip={hotel?.zip}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
