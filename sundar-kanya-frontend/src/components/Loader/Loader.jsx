import { InfinitySpin } from "react-loader-spinner";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <InfinitySpin
        width="180"
        color="#d63384"
      />
    </div>
  );
};

export default Loader;