import Spinner from "@/components/Spinner";
import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutaions";
import { Models } from "appwrite";
import React from "react";
import { useParams } from "react-router-dom";
type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  if (isPending) return <Spinner />;
  return (
    <div className="flex flex-1">
      <div className="common-container ">
        <div className="max-w-5xl flex justify-start items-center gap-3 mr-auto">
          <img
            src="/assets/icons/add-post.svg"
            alt="add post"
            width={36}
            height={36}
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
