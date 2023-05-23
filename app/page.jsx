import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered </span>
        Prompts
      </h1>
      <p className="desc text-center">
        PromptAI is an open-source AI prompting tool for the modern world
        – designed exclusively to discover, create & share prompts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
