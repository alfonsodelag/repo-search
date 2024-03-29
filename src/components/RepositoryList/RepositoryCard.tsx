import { FC } from 'react';
import Image from 'next/image';
import { GoStar, GoRepoForked, GoLinkExternal } from 'react-icons/go';

import { Repository } from '../../types';

import { LanguageColor } from './LanguageIcon';

const numberFormatter = new Intl.NumberFormat('en', {
  notation: 'compact',
});

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard: FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <article
      data-testid="repository-name"
      className="flex flex-col p-4 mb-4 rounded bg-white shadow-md transition duration-300 ease-in-out transform hover:shadow-lg"
    >
      <div className="flex gap-2">
        <Image
          src={repository.owner.avatar_url}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-black text-lg font-semibold transition-opacity duration-300 ease-in-out hover:opacity-70"
        >
          {repository.full_name} <GoLinkExternal className="ml-2" />
        </a>
      </div>
      <div className="text-base my-2">{repository.description}</div>

      <div className="flex items-center text-gray-600 text-sm">
        <div className="flex items-center mr-4">
          <GoStar className="mr-1" />
          <span>{numberFormatter.format(repository.stargazers_count)}</span>
        </div>

        <div className="flex items-center mr-4">
          <GoRepoForked className="mr-1" />
          <span>{numberFormatter.format(repository.forks)}</span>
        </div>

        {repository.language && (
          <div className="flex items-center mr-4">
            <LanguageColor language={repository.language} />
          </div>
        )}

        {repository.license && (
          <div className="flex items-center mr-4">
            <span>{repository.license.name}</span>
          </div>
        )}

        <div className="flex flex-col">
          {repository.created_at && (
            <div className="flex items-center mr-4">
              <span>
                Created at:{' '}
                {new Date(repository.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
          {repository.updated_at && (
            <div className="flex items-center mr-4">
              <span>
                Updated at:{' '}
                {new Date(repository.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default RepositoryCard;
