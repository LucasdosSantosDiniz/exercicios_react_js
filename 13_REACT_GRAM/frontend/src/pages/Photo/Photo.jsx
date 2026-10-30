import "./Photo.css";
import { uploads } from "../../utils/config";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { comment, getPhoto, like } from "../../slices/photoSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import LikesContainer from "../../components/LikesContainer/LikesContainer";
import { useResetComponentMessage } from "../../hooks/useRessetComponents.Message";
import Message from "../../components/Message/Message";

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [textComment, setTextComment] = useState("");

  const { photo, loading, error, message } = useSelector(
    (state) => state.photo,
  );

  const resetMessage = useResetComponentMessage(dispatch);
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = async (photoId) => {
    const result = await dispatch(like(photoId));

    if (like.fulfilled.match(result)) {
      dispatch(getPhoto(id));
    }

    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const comentData = {
      comment: textComment,
      id: photo._id,
    };

    dispatch(comment(comentData));

    setTextComment("");

    resetMessage();
  };

  if (loading) {
    return <p> Carregando...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikesContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentarios: ({photo.comments?.length || 0})</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="O que está pensando ?"
                onChange={(e) => setTextComment(e.target.value)}
                value={textComment || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default Photo;
