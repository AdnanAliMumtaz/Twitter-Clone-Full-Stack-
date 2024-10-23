import { POSTS } from "../../utils/db/dummy";
import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";

const Posts = () => {
    const isLoading = false;

    return (
        <>
            {isLoading && (
                <div className="flex flex-col justify-center">
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && POSTS?.length === 0 && <p>No posts in this tab.</p>}
            {!isLoading && POSTS && (
                <div>
                    {POSTS.map((post) => (
                        <Post key={[post._id]} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Posts;
