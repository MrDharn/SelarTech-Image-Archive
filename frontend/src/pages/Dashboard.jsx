import { useEffect, useState, useContext } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import ImageCard from "../components/ImageCard";

import UploadForm from "../components/UploadForm";

import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [images, setImages] = useState([]);

  const { user } = useContext(AuthContext);

  const fetchImages = async () => {
    try {
      const response = await API.get("/archive");

      setImages(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {images.length === 0 && (
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          No images uploaded yet
        </h2>
      )}
      <Navbar />

      {user?.role === "admin" && <UploadForm fetchImages={fetchImages} />}

      <div className="gallery">
        {images.map((image) => (
          <ImageCard key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
