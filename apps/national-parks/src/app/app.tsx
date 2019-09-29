import React, { useEffect, useState } from 'react';
import { IPark } from '@national-parks/api-interfaces';

export const App = () => {
  const [parks, setParks] = useState<IPark[]>();

  useEffect(() => {
    fetch('/api/park')
      .then(r => r.json())
      .then(setParks);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to national-parks!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png"
        />
      </div>
      {/* <div>{parks[0].name}</div> */}
    </>
  );
};

export default App;
