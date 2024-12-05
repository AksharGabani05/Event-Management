import React from "react";
import { Link } from "react-router-dom"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { FaEdit, FaTrashAlt } from "react-icons/fa"; 
import { AiOutlineRead } from "react-icons/ai";
import "./EventCard.css";

const EventCard = ({ id, date, heading, location, img, onEdit, onDelete }) => {

  const formattedDate = date && date.year && date.month 
    ? `${date.month}/${date.year}`  
    : date; 

 
  const handleDelete = (id) => {
    onDelete(id);
    
  };

  return (
    <div className="event-card">
      <div className="card-img-wrapper">
        <img src={img} alt="Event" className="card-img" />
      </div>
      <div className="card-content">
        <h2 className="card-heading">{heading}</h2>
        <p className="card-date">{formattedDate}</p>
        <p className="card-location">{location}</p>
        
        <div className="card-footer">
          <Link to={`/events/${id}`} className="read-more">
            <AiOutlineRead className="icon" /> Read More
          </Link>

          <button className="edit-btn" onClick={() => onEdit(id)}>
            <FaEdit className="icon" /> Edit
          </button>

          <button className="delete-btn" onClick={() => handleDelete(id)}>
            <FaTrashAlt className="icon" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
