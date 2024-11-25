import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import EventList from "../pages/EventList/EventList"; // Protected route
import FilterEvents from "../pages/FilterEvents/FilterEvents";
import EventDetail from "../pages/EventDetails/EventDetails";
import { isAuthenticated } from "../utils/auth"; // Import auth check

// Protected Route Component to ensure the user is authenticated
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export const routes = [
  // Public Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Signup />,
  },

  // Protected Routes (User needs to be logged in to access these)
  {
    path: "/event-list",
    element: <ProtectedRoute element={<EventList />} />,
  },
  {
    path: "/find-events",
    element: <ProtectedRoute element={<FilterEvents />} />,
  },
  {
    path: "/events/:id",
    element: <ProtectedRoute element={<EventDetail />} />,
  },
];
