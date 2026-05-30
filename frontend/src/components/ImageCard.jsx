function ImageCard({ image }) {
  return (
    <div className="image-card">
      <img src={image.imageUrl} alt={image.title} />

      <div className="image-content">
        <h3>{image.title}</h3>

        <p>Uploaded by: {image.uploadedBy?.username}</p>
      </div>
    </div>
  );
}

export default ImageCard;