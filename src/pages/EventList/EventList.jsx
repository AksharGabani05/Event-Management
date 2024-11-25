import React, { useState } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import { eventList as initialEventList } from "../../utils/EventDatabase.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal"; // Importing react-modal
import { FaPlusCircle, FaTimes, FaEdit } from "react-icons/fa"; // Add icons for Add, Cancel, and Update
import "./EventList.css";
import Footer from "../../components/Footer/Footer.jsx";

// Modal styles with responsive design and scrollable content
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "80%", // Default width for small screens
    maxWidth: "600px", // Maximum width for larger screens
    borderRadius: "8px",
    overflowY: "auto", // Enable vertical scrolling if content overflows
    maxHeight: "80vh", // Maximum height for the modal
    boxSizing: "border-box", // Ensure padding is included in width/height
  },
};

Modal.setAppElement("#root"); // For accessibility

const EventList = () => {
  const [eventList, setEventList] = useState(initialEventList);
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: "",
    heading: "",
    date: { year: "", month: "" },
    location: "",
    description: "",
    img: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const handleEdit = (id) => {
    // Find the event by id
    const eventToEdit = eventList.find((event) => event.id === id);
    if (eventToEdit) {
      // Set the form state to the values of the event being edited
      setNewEvent(eventToEdit);
      setIsModalOpen(true); // Open modal for editing
    }
  };

  const handleDelete = (id) => {
    const updatedEventList = eventList.filter((event) => event.id !== id);
    setEventList(updatedEventList);
    toast.success("Event deleted successfully!");
  };

  const handleAddEvent = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    if (newEvent.id) {
      // If an event ID is present, it means we are editing an existing event
      const updatedEventList = eventList.map((event) =>
        event.id === newEvent.id ? newEvent : event
      );
      setEventList(updatedEventList);
      toast.success("Event updated successfully!");
    } else {
      // If no event ID is present, we are adding a new event
      const newEventData = {
        ...newEvent,
        id: Date.now(), // Generate a unique ID based on timestamp
      };
      setEventList((prevEventList) => [...prevEventList, newEventData]);
      toast.success("Event added successfully!");
    }

    // Reset the form after submitting
    setNewEvent({
      id: null,
      title: "",
      heading: "",
      date: { year: "", month: "" },
      location: "",
      description: "",
      img: "",
    });
    setIsModalOpen(false); // Close modal after submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const [year, month] = value.split("-"); // Assuming the date format is "yyyy-mm"
      setNewEvent((prevState) => ({
        ...prevState,
        date: { year, month },
      }));
    } else {
      setNewEvent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const renderEventCards = () => {
    return eventList.map(({ id, title, heading, date, location, description, img }) => (
      <EventCard
        key={id}
        id={id}
        title={title}
        heading={heading}
        date={date}
        location={location}
        description={description}
        img={img}
        onEdit={handleEdit} // Pass down onEdit to EventCard
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <div>
      <Navigation />
      <div className="event-list-wrapper">
        <div className="event-list">
          {eventList.length > 0 ? renderEventCards() : <p>No events available</p>}
        </div>
      </div>
      <Footer/>

      {/* Add/Edit Event Button */}
      <button className="add-event-button" onClick={() => setIsModalOpen(true)}>
        <FaPlusCircle className="icon" /> Add Event
      </button>

      {/* Modal for Add/Edit Event */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
        contentLabel="Event Form"
      >
        <h3>{newEvent.id ? "Edit Event" : "Add New Event"}</h3>
        <form onSubmit={handleAddEvent}>
          <div>
            <label>Event Title:</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Event Heading:</label>
            <input
              type="text"
              name="heading"
              value={newEvent.heading}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="month"
              name="date"
              value={`${newEvent.date.year}-${newEvent.date.month}`}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="img"
              value={newEvent.img}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
            <FaEdit className="icon" /> {newEvent.id ? "Update Event" : "Add Event"}
          </button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            <FaTimes className="icon" /> Cancel
          </button>
        </form>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default EventList;
