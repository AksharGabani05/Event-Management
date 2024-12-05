import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Created by <strong>Akshar Gabani</strong> |{" "}
        <a
          href="https://github.com/AksharGabani05" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
