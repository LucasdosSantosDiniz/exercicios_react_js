import "./Home.css";
import LikesContainer from "../../components/LikesContainer/LikesContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useRessetComponents.Message";
import { getPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetComponentMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = async (photoId) => {
    const result = await dispatch(like(photoId));

    if (like.fulfilled.match(result)) {
      dispatch(getPhotos());
    }

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />

            <LikesContainer photo={photo} user={user} handleLike={handleLike} />

            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver Mais
            </Link>
          </div>
        ))}

      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Ainda não tem fotos publicadas
          <Link to={`/users/${user._id}`}> Clique Aqui </Link>
        </h2>
      )}
    </div>
  );
};

export default Home;
