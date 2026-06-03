import { useState , useRef} from "react";

import API from "../services/api";

function UploadForm({ fetchImages }) {
  const [title, setTitle] = useState("");

  const [image, setImage] = useState(null);
  const fileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("image", image);

    try {
      await API.post(
        "/archive/upload",

        formData,
      );
      if(fileRef.current.value){
        fileRef.current.value = ""
      }
      
      alert("Uploaded");

      fetchImages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} ref={fileRef}/>

      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
