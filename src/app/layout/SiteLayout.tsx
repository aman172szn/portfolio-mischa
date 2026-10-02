import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { primaryNavigation } from '../navigation';
import './site-layout.css';

export function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="site-header__brand" to="/" onClick={closeMenu}>
          <span className="site-header__brand-name">Mischa Tangian</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <NavLink
              end={item.path === '/'}
              className="site-header__nav-link"
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <div
            className="site-header__language"
            aria-label="Language selector placeholder"
          >
            <button className="site-header__language-option" type="button">
              DE
            </button>
            <button
              className="site-header__language-option"
              type="button"
              disabled
            >
              EN
            </button>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="site-header__menu-button"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="site-header__menu-line" />
            <span className="site-header__menu-line" />
          </button>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="mobile-nav"
        data-open={isMenuOpen}
        hidden={!isMenuOpen}
        id="mobile-navigation"
      >
        {primaryNavigation.map((item) => (
          <NavLink
            end={item.path === '/'}
            className="mobile-nav__link"
            key={item.path}
            to={item.path}
            onClick={closeMenu}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <Link className="site-footer__brand" to="/">
            Mischa Tangian
          </Link>
          <p className="site-footer__note">
            Portfolio and digital archive in progress.
          </p>
        </div>
      </footer>
    </div>
  );
}
