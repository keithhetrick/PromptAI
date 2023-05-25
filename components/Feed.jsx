"use client";

import { useState, useEffect } from "react";
import loader from "@public/assets/icons/loader.svg";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-12 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post?._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchDebouncer, setSearchDebouncer] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all posts
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  // Fetch posts on page load
  useEffect(() => {
    fetchPosts();

    return () => setAllPosts([]);
  }, []);

  // Filter posts based on search text
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "gi"); // g: global, i: case insensitive
    return allPosts?.filter(
      (item) =>
        regex.test(item?.creator?.username) ||
        regex.test(item?.tag) ||
        regex.test(item?.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchDebouncer);
    setSearchText(e?.target?.value);

    setSearchDebouncer(
      setTimeout(() => {
        const searchResult = filterPrompts(e?.target?.value);
        setSearchedResults(searchResult);
      }, 500)
    );

    setLoading(true);

    if (e.target.value.length === 0) {
      setLoading(false);
    }
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setSearchedResults([]);
    setLoading(false);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />

        {searchText?.length > 0 ? (
          <button
            type="button"
            onClick={handleClearSearch}
            className="search_input_clear"
          >
            Clear
          </button>
        ) : null}
      </form>

      {/* {searchedResults?.length === 0 ? (
        <p className="text-center text-gray-500">
        No results found for <span className="font-bold">{searchText}</span>
        </p>
      ) : null} */}

      {/* {loading === true ? (
        <img src={loader?.src} alt="loading" className="w-10 h-10 mx-auto" />
      ) : ( */}
      <PromptCardList
        data={searchedResults?.length > 0 ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
      />
      {/* )} */}
    </section>
  );
};

export default Feed;
