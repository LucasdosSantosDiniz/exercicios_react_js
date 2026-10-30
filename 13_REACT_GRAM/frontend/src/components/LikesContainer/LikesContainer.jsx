import "./LikesContainer.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikesContainer = ({ photo, user, handleLike }) => {
  const userLiked = photo.likes?.some(
    (userId) => userId.toString() === user._id.toString(),
  );

  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {userLiked ? (
            <BsHeartFill onClick={() => handleLike(photo._id)} />
          ) : (
            <BsHeart onClick={() => handleLike(photo._id)} />
          )}

          <p>{photo.likes.length} likes(s)</p>
        </>
      )}
    </div>
  );
};

export default LikesContainer;
