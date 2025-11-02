declare namespace React {
  // useCallback parameters are implicitly typed to any.
  // This override has the effect of forcing you to write types any parameters you want to use.
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873
  // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/52873#issuecomment-905570051
  function useCallback<Args extends unknown[], R>(
    fn: (...args: Args) => R,
    deps: readonly unknown[]
  ): (...args: Args) => R;
}
