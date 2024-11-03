import React, { useState } from "react";
import { useIfNotAuthenticated } from "../hooks/useIfNotAuthenticated";
import { uploadToStorage } from "../utils/firebaseUtils";
import ImagePreview from "./ImagePreview";
import FormInput from "./FormInput";
import "../styles/UploadCard.css";

const UploadCard = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [inputValues, setInputValues] = useState({
    author: "",
    tags: "",
    description: "",
    photoDetails: "",
    location: "",
  });

  const RedirectMessage = useIfNotAuthenticated();
  if (RedirectMessage) {
    return RedirectMessage;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target.image.files[0];
    if (file) {
      const downloadURL = await uploadToStorage(file, "images");
      console.log("File available at", downloadURL);
    }
  };

  return (
    <center>
      <div className="form-group">
        <form className="form-group" onSubmit={handleSubmit}>
          <center>
            <legend>
              <h3>
                <b>Upload Image</b>
              </h3>
            </legend>
          </center>
          <div className="formInput">
            <div className="imageInput">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <ImagePreview imageUrl={imageUrl} />

          <FormInput
            label="Author"
            name="author"
            value={inputValues.author}
            onChange={handleInputChange}
          />

          <FormInput
            label="Tags"
            name="tags"
            value={inputValues.tags}
            onChange={handleInputChange}
          />

          <FormInput
            label="Description"
            name="description"
            value={inputValues.description}
            onChange={handleInputChange}
          />

          <FormInput
            label="Camera Details"
            name="photoDetails"
            value={inputValues.photoDetails}
            onChange={handleInputChange}
          />

          <FormInput
            label="Location"
            name="location"
            value={inputValues.location}
            onChange={handleInputChange}
          />

          <div>
            <input className="submitButton" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </center>
  );
};

export default UploadCard;