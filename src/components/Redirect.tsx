import React, { useEffect } from 'react';

function Redirect() {

  useEffect(() => {
    window.location.href = 'https://staking.xx.network';
  }, []);

  return (
    <div>
    </div>
  );
}

export default Redirect;