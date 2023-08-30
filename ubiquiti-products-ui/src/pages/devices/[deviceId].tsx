import React from 'react';
import { useRouter } from 'next/router';

const Check = () => {
  const router = useRouter();

  const { query } = router;

  console.log(query);

  return <div style={{ marginTop: '300px' }}>cool {query.deviceId}</div>;
};

export default Check;
