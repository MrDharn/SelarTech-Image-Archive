import API from "../services/api";

function ImageCard({ image, user, fetchImages }) {
  console.log(image)
  //handle Deletion of image
  // console.log(image[0]._id);
  const handleDelete = async () => {

    const confirmDelete = window.confirm("Delete this image ?");
    //Check if you confirm to delete;
    if (!confirmDelete) return;

    //get the image id to be deleted
    try {
      await API.delete(`/archive/${image._id}`);

      fetchImages();
    } catch (e) {
      console.error(e);
      alert("delete Failed");
    }
  };
  return (
    <div className="image-card">
      <img src={image.imageUrl} alt={image.title} />

      <div className="image-content">
        <h3>{image.title}</h3>

        <p>Uploaded by: {image.uploadedBy?.username}</p>

        {user?.role === "admin" && (
          <div className="admin-actions">
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageCard;
