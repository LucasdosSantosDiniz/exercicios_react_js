import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Message from "../../components/Message/Message";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { getUserDetails } from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import {
  deletePhoto,
  getUserPhotos,
  publishPhoto,
  resetMessage,
  updatePhoto,
} from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    photos,
    loading: loadingPhotos,
    message: messagePhotos,
    error: errorPhotos,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  };

  const ressetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);

    dispatch(publishPhoto(formData));

    setTitle("");
    setImage("");

    ressetComponentMessage();
  };

  const handleDelete = (photoId) => {
    dispatch(deletePhoto(photoId));
    ressetComponentMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));
    hideOrShowForms();
    setEditId("");
    setEditTitle("");
    setEditImage("");

    ressetComponentMessage();
  };

  const handleCanceledEdit = (e) => {
    e.preventDefault();
    hideOrShowForms();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }
    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}

        <div>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Titulo para foto</span>
                <input
                  type="text"
                  placeholder="Insira um titulo para foto"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Imagem</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhotos && <input type="submit" value="Postar" />}
              {loadingPhotos && (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
          {/* Editando Imagens */}
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando...</p>

            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />

              <input type="submit" value="Salvar" />

              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCanceledEdit}
              >
                Cancelar Edição
              </button>
            </form>
          </div>

          {errorPhotos && <Message msg={errorPhotos} type="error" />}
          {messagePhotos && <Message msg={messagePhotos} type="success" />}
        </>
      )}

      <div className="user-photos">
        <h2> Minhas Fotos</h2>
        <div className="photos-container">
          {photos &&
            photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.image}
                  />
                )}

                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))}
          {photos && photos.length === 0 && <p>Ainda não tem fotos</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
