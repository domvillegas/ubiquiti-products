import React, { useState } from 'react';
import styles from './ProductCard.module.css';

interface Props {
  productData:
    | {
        productName: string;
        line: string;
        shortnames: string[];
        imagePath: string;
      }
    | undefined;
}

const ProductCard = ({ productData }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const { productName, line, shortnames, imagePath } = productData || {};

  return (
    <div
      className={`${styles.productCard} ${
        isHovered ? styles.isHovered : ''
      } generalFocus`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div className={styles.topSection}>
        <span className={`${styles.lineTag} body1`}>{line}</span>
        <img src={imagePath} alt={productName} />
      </div>
      <div className={styles.bottomSection}>
        <span className={`bold ${styles.productName}`}>{productName}</span>
        <span className="body2">{shortnames?.join(', ')}</span>
      </div>
    </div>
  );
};

export default ProductCard;
