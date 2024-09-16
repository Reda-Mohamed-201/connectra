import { useUserContext } from "@/context/AuthContext";
import { timeSpentSince } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
type PostProps = {
  post: Models.Document;
};
export default function PostCard({ post }: PostProps) {
  const { user } = useUserContext();
  if (!post.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post?.creator?.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator?.name}
            </p>
            <div className=" flex-center gap-2 text-light-2">
              <p className="subtle-semibold lg:small-regular">
                {timeSpentSince(new Date(post?.$createdAt))}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5 ">
          <p className="text-wrap break-words"> {post?.caption}</p>
          {post.tags > 0 && (
            <ul className="flex flex-wrap gap-1 mt-2">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
        </div>
        {post.image && (
          <img
            src={post.image}
            alt="post image"
            className="post-card_image mb-3"
          />
        )}
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
}
