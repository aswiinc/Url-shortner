import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className='bg-slate-900 text-white text-base text-center pu-5'>
        Copyright &#169; URLShortner | Aswiinc
    </div>
  );
};

export default Footer;
