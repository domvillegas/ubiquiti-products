import React from 'react';
import { useParams } from 'next/navigation';

const Check = () => {
  const params = useParams();

  console.log(params)

  return <div style={{ marginTop: '300px' }}>cool</div>;
};

export default Check;
