import Overlay from "./Overlay";
import Loading1 from "./Loader1";

const LoadingComponent = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0">
      <Overlay />
      <div className="relative z-10">
        <Loading1 />
      </div>
    </div>
  );
};

export default LoadingComponent;
