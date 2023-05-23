"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();

    return () => setUserPosts([]);
  }, [params?.id]);

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
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
    </>
  );
};

export default UserProfile;
