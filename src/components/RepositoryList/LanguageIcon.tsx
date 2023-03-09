import { FC, Fragment } from 'react';

import colors from 'github-colors';

interface CircleProps {
  color: string;
}

function Circle({ color }: CircleProps) {
  return (
    <span
      className="w-3 h-3 rounded-full mr-1 border border-gray-300 dark:border-gray-700"
      style={{ backgroundColor: color }}
    />
  );
}

interface LanguageColorProps {
  language: string;
}

const LanguageColor: FC<LanguageColorProps> = ({ language }) => {
  const { color = '#fff' } = colors.get(language) || {};

  return (
    <>
      {language && (
        <span className="inline-flex items-center">
          <Circle color={color} />
          <span className="text-gray-700 dark:text-gray-400 text-sm">
            {language}
          </span>
        </span>
      )}
    </>
  );
};

export { LanguageColor };
