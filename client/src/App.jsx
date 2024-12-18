import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import {
  Home,
  Login,
  Signup,
  NotFound,
  CreateTrip,
  Profile,
  TripDetails,
  UpdateTrip,
  Trips,
} from "./pages";
import Explore from "./pages/Explore";

import { Navigation, Footer } from "./components";

import { setUser } from "./store/reducers/userSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user && (
          <>
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route path="/trips/:id/edit" element={<UpdateTrip />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/explore" element={<Explore />} />
          </>
        )}
        <Route path="/create-trip" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
