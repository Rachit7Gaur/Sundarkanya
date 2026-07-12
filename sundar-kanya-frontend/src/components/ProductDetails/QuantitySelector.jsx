import "./QuantitySelector.css";
import { FiMinus, FiPlus } from "react-icons/fi";

const QuantitySelector = ({
  quantity,
  setQuantity,
  maxStock,
}) => {

  const increase = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector">

      <button onClick={decrease}>
        <FiMinus />
      </button>

      <span>{quantity}</span>

      <button onClick={increase}>
        <FiPlus />
      </button>

    </div>
  );
};

export default QuantitySelector;