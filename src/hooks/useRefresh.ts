import { useCallback, useState } from "react";

type RefreshResult = {
  isRefreshing: boolean;
  handleRefresh: () => Promise<void>;
};

export const useRefresh = <T>(refetch: () => Promise<T>): RefreshResult => {
  const [isRefreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return { isRefreshing, handleRefresh };
};
