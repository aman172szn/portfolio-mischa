import { useState } from 'react';
import { Link, Navigate, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';

import { AudioPlayerProvider } from '../audio/AudioPlayerContext';
import { PersistentAudioPlayer } from '../audio/PersistentAudioPlayer';
import { getLocale, isLocale, locales, localizePath, siteCopy, switchLocalePath } from '../i18n';
import { primaryNavigation } from '../navigation';
import { ScoreReader } from '../score/ScoreReader';
import { ScoreReaderProvider } from '../score/ScoreReaderContext';
import './site-layout.css';

export function SiteLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locale: localeParam } = useParams();
  const location = useLocation();
  const locale = getLocale(localeParam);

  if (!isLocale(localeParam)) {
    return <Navigate to="/de" replace />;
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <AudioPlayerProvider>
      <ScoreReaderProvider>
        <div className="site-shell">
      <header className="site-header">
        <Link className="site-header__brand" to={localizePath('/', locale)} onClick={closeMenu}>
          <span className="site-header__brand-name">Mischa Tangian</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <NavLink
              end={item.path === '/'}
              className="site-header__nav-link"
              key={item.path}
              to={localizePath(item.path, locale)}
            >
              {item.label[locale]}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <div
            className="site-header__language"
            aria-label="Language selector"
          >
            {locales.map((option) => (
              <Link
                aria-current={option === locale ? 'true' : undefined}
                className="site-header__language-option"
                key={option}
                to={switchLocalePath(location.pathname, option)}
              >
                {option.toUpperCase()}
              </Link>
            ))}
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? siteCopy.menu.close[locale] : siteCopy.menu.open[locale]}
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
            to={localizePath(item.path, locale)}
            onClick={closeMenu}
          >
            {item.label[locale]}
          </NavLink>
        ))}
      </nav>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <Link className="site-footer__brand" to={localizePath('/', locale)}>
            Mischa Tangian
          </Link>
          <p className="site-footer__note">
            {siteCopy.footerNote[locale]}
          </p>
        </div>
      </footer>
      <PersistentAudioPlayer locale={locale} />
      <ScoreReader locale={locale} />
    </div>
      </ScoreReaderProvider>
    </AudioPlayerProvider>
  );
}
