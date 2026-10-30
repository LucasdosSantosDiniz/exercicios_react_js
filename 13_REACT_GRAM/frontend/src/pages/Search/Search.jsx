import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useRessetComponents.Message";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LikesContainer from "../../components/LikesContainer/LikesContainer";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = async (photoId) => {
    await dispatch(like(photoId));

    resetMessage();
  };

  if (loading) {
    return <p> Carregando...</p>;
  }

  return (
    <div id="search">
      {" "}
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
          Não foram encontrados resultado de busca
          <Link to={`/users/${user._id}`}> Clique Aqui </Link>
        </h2>
      )}
    </div>
  );
};

export default Search;
