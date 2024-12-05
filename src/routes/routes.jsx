import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import EventList from "../pages/EventList/EventList"; 
import FilterEvents from "../pages/FilterEvents/FilterEvents";
import EventDetail from "../pages/EventDetails/EventDetails";
import { isAuthenticated } from "../utils/auth"; 


const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export const routes = [
 
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Signup />,
  },

  
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
