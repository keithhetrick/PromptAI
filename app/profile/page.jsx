"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  // handle router errors
  if (!router) return null;
  if (router?.isFallback) {
    return <div>Loading...</div>;
  }

  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  // Fetch User's posts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user?.id) {
      fetchPosts();
    }

    return () => setPosts([]);
  }, []);

  const handleEdit = (post) => {
    router?.push(`/update-prompt?id=${post?._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post?._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPosts((prevPosts) =>
            prevPosts.filter((p) => p?._id !== post?._id)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="w-full">
        <button
          onClick={() => router?.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4  rounded flex justify-start"
        >
          Go back
        </button>
      </div>
      <Profile
        name={session?.user?.name || "User"}
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default MyProfile;
