import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffects';

const useResetScrollTop = (): void => {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export { useResetScrollTop };
