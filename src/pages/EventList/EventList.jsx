import React, { useState } from "react";
import EventCard from "../../components/EventCard/EventCard.jsx";
import { eventList as initialEventList } from "../../utils/EventDatabase.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal"; 
import { FaPlusCircle, FaTimes, FaEdit } from "react-icons/fa"; 
import "./EventList.css";
import Footer from "../../components/Footer/Footer.jsx";


const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    width: "80%", 
    maxWidth: "600px", 
    borderRadius: "8px",
    overflowY: "auto",
    maxHeight: "80vh",
    boxSizing: "border-box", 
  },
};

Modal.setAppElement("#root"); 

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
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleEdit = (id) => {
   
    const eventToEdit = eventList.find((event) => event.id === id);
    if (eventToEdit) {
      
      setNewEvent(eventToEdit);
      setIsModalOpen(true); 
    }
  };

  const handleDelete = (id) => {
    const updatedEventList = eventList.filter((event) => event.id !== id);
    setEventList(updatedEventList);
    toast.success("Event deleted successfully!");
  };

  const handleAddEvent = (e) => {
    e.preventDefault(); 

    if (newEvent.id) {
      const updatedEventList = eventList.map((event) =>
        event.id === newEvent.id ? newEvent : event
      );
      setEventList(updatedEventList);
      toast.success("Event updated successfully!");
    } else {
     
      const newEventData = {
        ...newEvent,
        id: Date.now(), 
      };
      setEventList((prevEventList) => [...prevEventList, newEventData]);
      toast.success("Event added successfully!");
    }

    
    setNewEvent({
      id: null,
      title: "",
      heading: "",
      date: { year: "", month: "" },
      location: "",
      description: "",
      img: "",
    });
    setIsModalOpen(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      const [year, month] = value.split("-"); 
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
        onEdit={handleEdit} 
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

     
      <button className="add-event-button" onClick={() => setIsModalOpen(true)}>
        <FaPlusCircle className="icon" /> Add Event
      </button>

    
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
