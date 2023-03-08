import React, { FC } from "react";
import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";

const Header: FC = () => {
  return (
    <div className="flex justify-center w-full border-b-2 border-gray-200 bg-black">
      <header className="flex items-center w-full h-16 max-w-768 px-4">
        <Link href="/">
          <h3 className="m-0 text-white">GitHub Repo Searcher</h3>
        </Link>
        <a
          className="inline-flex ml-auto text-white"
          href="https://github.com/alfonsodelag/repo-search"
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
