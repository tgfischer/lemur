import { useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  type ImageResizeMode,
} from "react-native";

type LoadableImageProps = {
  url: string;
  nsfw: boolean;
  resizeMode?: ImageResizeMode;
};

export const LoadableImage = ({
  url,
  nsfw,
  resizeMode,
}: LoadableImageProps): JSX.Element => {
  const [isLoaded, setLoaded] = useState(false);
  return (
    <ImageBackground
      source={{ uri: url, cache: "force-cache" }}
      onLoad={() => {
        setLoaded(true);
      }}
      blurRadius={nsfw ? 100 : undefined}
      resizeMode={resizeMode}
    >
      {!isLoaded && <ActivityIndicator style={{ alignSelf: "center" }} />}
    </ImageBackground>
  );
};
