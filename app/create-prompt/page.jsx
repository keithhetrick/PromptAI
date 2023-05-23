"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loggedIn, setLoggedIn] = useState(session?.user?.name ? true : false);

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // Login check
  if (!loggedIn) {
    router.push("/");
  } else {
    useEffect(() => {
      setLoggedIn(true);

      return () => setLoggedIn(false);
    }, [session]);
  }

  // Create post
  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post?.prompt,
          userId: session?.user?.id,
          tag: post?.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("\nERROR: ", error);
    } finally {
      setSubmitting(false);
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
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePrompt;
