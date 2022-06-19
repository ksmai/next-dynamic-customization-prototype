import { useCallback, useMemo } from "react";

const useActions = () => {
  const action1 = useCallback(() => alert('action1 triggered!!'), []);
  const action2 = useCallback(() => alert('action2 triggered!!'), []);
  const actions = useMemo(() => ({
    action1, action2,
  }), [action1, action2]);

  return actions;
}

export default useActions;