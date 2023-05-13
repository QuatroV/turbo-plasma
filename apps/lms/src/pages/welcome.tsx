import type { NextPage } from "next";

const Welcome: NextPage = () => {
  return (
    <div>
      This is Welcome Page{" "}
      <div className="@container">
        <div className="@sm:underline">Hello</div>
      </div>
    </div>
  );
};

export default Welcome;
