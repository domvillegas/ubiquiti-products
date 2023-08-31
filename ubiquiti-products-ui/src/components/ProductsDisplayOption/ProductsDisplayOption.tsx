import React from 'react';
import styles from './ProductsDisplayOption.module.css';

interface Props {
  optionName?: string;
  iconPath?: string;
  iconAltText?: string;
  optionEffect: () => void;
}

const ProductsDisplayOption = ({
  optionName,
  iconPath,
  iconAltText,
  optionEffect
}: Props) => {

  return (
    <div
      className={`generalBackgroundTransition generalFocus ${styles.productsDisplayOption}`}
      tabIndex={0}
      onClick={optionEffect}
    >
      {optionName ? (
        <span className="body2">{optionName}</span>
      ) : (
        <img
          src={iconPath as string}
          alt={iconAltText as string}
        />
      )}
    </div>
  );
};

export default ProductsDisplayOption;
