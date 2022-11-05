import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import ChatIcon from "../../img/chat-icon.png";
import { createChat, findChat } from "../../api/ChatRequests";
import { useNavigate } from "react-router-dom";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            publicFolder + person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <div>
        <div
          onClick={async () => {
            const isExistRoom = await findChat(user._id, person._id);

            if (!isExistRoom.data) {
              createChat({
                senderId: user._id,
                receiverId: person._id,
              });
            }

            navigate("/chat");
          }}
        >
          <img
            src={ChatIcon}
            alt=""
            style={{ maxWidth: "30px", marginTop: "2px", cursor: "pointer" }}
          />
        </div>
        <button
          className={
            following ? "button fc-button UnfollowButton" : "button fc-button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default User;
