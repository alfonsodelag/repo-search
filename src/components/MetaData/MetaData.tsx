import React, { FC } from 'react';
import Head from 'next/head';

const defaultTitle = 'The GitHub Repo Searcher';
const description =
  'A tool for searching GitHub repositories, powered by Next.js.';
const siteUrl = 'https://github.com/alfonsodelag/repo-search';

interface MetaDataProps {
  searchValue: string;
}

const MetaData: FC<MetaDataProps> = ({ searchValue }) => {
  const title = searchValue ? `${searchValue} · ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        href="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      />

      <meta name="twitter:card" content="summary" />

      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content={`${siteUrl}favicon.png`} /> */}
      <meta property="og:title" content={title} />
      <meta
        property="og:url"
        content={searchValue ? `${siteUrl}?q=${searchValue}` : siteUrl}
      />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default MetaData;
