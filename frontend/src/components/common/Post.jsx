import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {

  const [comment, setComment] = useState("");
  const postOwner = post.user;
  const isLiked = false;

  const isMyPost = true;
  const formattedDate = "1h";
  const isCommenting = false;

  const handleDeletePost = (e) => {

  };

  const handlePostComment = (e) => {
    e.preventDefault();
  }

  const handleLikePost = () => { };

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link to={`/profile/${postOwner.username}`} className="w-8 rounded-full overflow-hidden">
            <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
              <span>.</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                <FaTrash className="cursor-pointer hover:text-red-500" onClick={handleDeletePost} />
              </span>
            )}
          </div>
          {/* Continue the code */}
        </div>
      </div>
    </>
  )
}

export default Post;
