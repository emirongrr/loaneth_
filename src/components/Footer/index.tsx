import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer = () => {
    const { t } = useTranslation('common')
return (
<footer className="flex flex-row justify-center items-center bg-transparent mt-40 py-20">
    <div className="flex flex-row justify-center items-center">
        <a href="https://github.com/emirongrr" className="text-black dark:text-white text-base font-normal mx-10">
            {t('developers')}
        </a>
    </div>
<p className="text-black dark:text-white text-sm m-0">© {new Date().getFullYear()} {t('trademark')}</p>
</footer>
);
};

export default Footer;