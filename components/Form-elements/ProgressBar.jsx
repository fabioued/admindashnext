import LoadingBar from "react-top-loading-bar";

import {
  useProgressContext,
  useSetProgressContext,
} from "../context/ProgressContext";

const ProgressBar = () => {
  const progress = useProgressContext();
  const setProgress = useSetProgressContext();

  return (
    <LoadingBar
      color="#4dae51"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};

export default ProgressBar;
