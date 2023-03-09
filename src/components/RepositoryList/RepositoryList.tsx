import { FC } from 'react';
import { Repository } from '../../types';
import RepositoryCard from './RepositoryCard';

interface RepositoryListProps {
  repositories: Repository[];
}

const RepositoryList: FC<RepositoryListProps> = ({ repositories }) => {
  return (
    <div>
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  );
};

export default RepositoryList;
