import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorsReducer.postErrors);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.name);
    data.append("userId", userData.id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData.id));
    setIsUpdating(false);
  };

  const cancleUpload = () => {
    setFile();
    setIsUpdating(false);
  };

  return (
    <div>
      <img
        src={userData.picture}
        alt="avatar utilisateur"
        className="profil-picture"
      />

      <form action="" onSubmit={handlePicture} className="flex margin">
        <label htmlFor="file" className="italic underline margin">
          <span> Modifier la photo de profil </span>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          onClick={() => setIsUpdating(true)}
        />

        {isUpdating && (
          <div className="flex row margin">
            <button onClick={cancleUpload}>
              <img src="./img/icons/xmark.png" alt="cancel" className="h50" />
            </button>
            <input type="submit" value="Envoyer" />
          </div>
        )}
      </form>
      <span>{error.maxSize}</span>
    </div>
  );
};

export default UploadImg;
