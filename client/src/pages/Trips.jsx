import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components";

import { getUserTrips } from "../services/tripApi";

import { logoutUser } from "../store/reducers/userSlice";

const Trips = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user } = userData;

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("trips");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleEdit = () => {
    console.log("Edit Profile");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
    console.log("Logout");
  };

  useEffect(() => {
    setIsLoading(true);
    getUserTrips(user._id)
      .then((trips) => {
        setTrips(trips);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        setIsLoading(false);
      });
  }, [user._id]);
  useEffect(() => {
    const filtered = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [trips, searchTerm]);

  return (
    <div
      key={filteredTrips.length}
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridGap: "2rem",
        padding: "2rem",
      }}
    >
      {isLoading ? (
        <p
          className="row"
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading trips...
        </p>
      ) : filteredTrips.length === 0 ? (
        <div
          className="inner-container"
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No Trips Found</h2>
          <Link to="/create-trip" className="button">
            Create a Trip
          </Link>
        </div>
      ) : (
        filteredTrips.map((trip) => (
          <Link key={trip.id} to={`/trips/${trip._id}`}>
            <Card trip={trip} />
          </Link>
        ))
      )}
    </div>
  );
};

export default Trips;
