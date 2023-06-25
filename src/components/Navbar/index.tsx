import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'next-i18next';
import NavLink from './NavLink';
import NavSubMenu from './NavSubMenu';
import LangMenu from './LangMenu';
import Typography from 'components/UI/Typography';
import Moon from 'assets/home/Moon';
import Sun from 'assets/home/Sun';

import ConstructReference from 'libs/refconstructor';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation('common');

  const updateTheme = useCallback((theme) => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setTheme(theme);
  }, []);

  useEffect(() => {
    updateTheme(localStorage.theme || theme);
  }, [updateTheme, theme]);

  const handleClick = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLight = useCallback(() => {
    updateTheme('light');
    localStorage.theme = 'light';
  }, [updateTheme]);

  const handleDark = useCallback(() => {
    updateTheme('dark');
    localStorage.theme = 'dark';
  }, [updateTheme]);

  const links = [
    { name: t('home'), to: ConstructReference('/') },
    {
      name: t('learn'),
      to: ConstructReference('/learn'),
    },
  ];

  return (
    <nav
      className={cx(
        'flex fixed top-0 sm:px-5 w-full text-white z-50 rounded-lg overflow-hidden m-2 shadow-3xl backdrop-blur'
      )}
    >
      <Box className="max-w-md  mx-auto w-full flex flex-row justify-between items-center p-5 relative 2xl:max-w-6xl xl:max-w-6xl lg:max-w-4xl sm:max-w-xl sm:p-6 ">
        <Link href={ConstructReference('/')} className="block">
          <Box className="flex items-center text-white flex-grow cursor-pointer hover:no-underline ">
            <img src="/svg/logo.svg" alt="logo" className="w-9" />
            <span className="ml-5 text-xl font-extrabold text-black dark:text-white font-mono">
              BANK OF PEOPLE
            </span>
          </Box>
        </Link>
        <Box className="flex flex-row visible items-center absolute right-10 lg:invisible">
          {theme === 'dark' ? (
            <Moon onClick={handleLight} className="cursor-pointer mr-3" />
          ) : (
            <Sun onClick={handleDark} className="cursor-pointer mr-3" />
          )}
          <LangMenu />
          <IconButton onClick={handleClick} className="ml-2">
            <MenuIcon className="dark:text-white text-black" />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          classes={{ paper: 'dark:bg-cod-gray' }}
        >
          {links.map((link) => {
            /* if (link.subLinks) {
              return (
                <Box key={link.name}>
                  <Typography variant="p" className="font-bold ml-4 my-2">
                    {link.name}
                  </Typography>
                  {link.subLinks.map((subLink) => {
                    return (
                      <MenuItem
                        onClick={handleClose}
                        className="ml-4"
                        key={subLink.name}
                      >
                        <NavLink name={subLink.name} to={subLink.to || ''}>
                          <Typography variant="p" component="span">
                            {subLink.name}
                          </Typography>
                        </NavLink>
                      </MenuItem>
                    );
                  })}
                </Box>
              );
            } */
            return (
              <MenuItem onClick={handleClose} key={link.name}>
                <NavLink name={link.name} to={link.to || ''}>
                  <Typography variant="p" component="span">
                    {link.name}
                  </Typography>
                </NavLink>
              </MenuItem>
            );
          })}
        </Menu>
        <Box className="invisible space-x-10 flex flex-row items-center lg:visible">
          <Box className="space-x-10 hidden sm:flex">
            {links.map((link) => {
              /* if (link.subLinks) {
                return (
                  <NavSubMenu
                    key={link.name}
                    menuName={link.name}
                    links={link.subLinks}
                  />
                );
              } */
              return (
                <NavLink to={link.to || ''} name={link.name} key={link.name} />
              );
            })}
          </Box>
          {theme === 'dark' ? (
            <Moon onClick={handleLight} className="cursor-pointer" />
          ) : (
            <Sun onClick={handleDark} className="cursor-pointer" />
          )}
          <LangMenu />
        </Box>
      </Box>
    </nav>
  );
}
