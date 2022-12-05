import { useEffect } from 'react';

function Redirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
}

export default Redirect;