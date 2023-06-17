import { type UseQueryResult, useQuery } from "@tanstack/react-query";

type ImageCheckQueryOptions = {
  url: string;
};

export const useImageCheckQuery = ({
  url,
}: ImageCheckQueryOptions): UseQueryResult<boolean> => {
  return useQuery<boolean>(["image", url], async () => {
    const res = await fetch(url);
    const buffer = await res.blob();
    return buffer.type.startsWith("image/");
  });
};
