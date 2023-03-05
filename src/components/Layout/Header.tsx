import { FC } from "react";
import { GoMarkGithub } from "react-icons/go";

const Header: FC = () => {
  return (
    <div className="flex justify-center w-full border-b-2 border-gray-200 bg-black">
      <header className="flex items-center w-full h-16 max-w-768 px-4">
        <h3 className="m-0 text-white">GitHub Repo Searcher</h3>

        <a
          className="inline-flex ml-auto text-white"
          href="https://github.com/jigsawye/github-repo-searcher"
          target="_blank"
          rel="noreferrer"
        >
          <GoMarkGithub className="w-6 h-6" />
        </a>
      </header>
    </div>
  );
};

export default Header;
