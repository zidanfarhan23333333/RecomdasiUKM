import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} UKM Olahraga Unimma. All rights
        reserved.
      </p>
    </footer>
  );
}

export default Footer;
