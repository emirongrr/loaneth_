import React from 'react';

const Footer = () => {
return (
<footer className="flex flex-row justify-center items-center bg-transparent mt-40 py-20">
<div className="flex flex-row justify-center items-center">
<a href="https://github.com/emirongrr" className="text-black dark:text-white text-base font-normal mx-10">
Developers
</a>
</div>
<p className="text-black dark:text-white text-sm m-0">© {new Date().getFullYear()} All rights reserved.</p>
</footer>
);
};

export default Footer;