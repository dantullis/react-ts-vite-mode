import './Navbar.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Container,
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.scss';

const storedTheme = localStorage.getItem('theme') || 'light';

interface Theme {
  name: string;
  icon: string;
}

const arrayOfThemes: Theme[] = [
  { name: 'Auto', icon: 'bi-circle-half' },
  { name: 'Light', icon: 'bi-sun-fill' },
  { name: 'Dark', icon: 'bi-moon-stars-fill' },
];

const modifyDOM = (theme: string) => {
  if (
    theme === 'auto' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
};

function getPreferredTheme() {
  return (
    storedTheme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')
  );
}

const NavigationBar = () => {
  const [mode, setMode] = useState(getPreferredTheme());
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    modifyDOM(mode);
  }, [mode]);

  function setPreferredTheme(theme: string) {
    modifyDOM(theme);
    localStorage.setItem('theme', theme);
    setMode(theme);
  }

  return (
    <Navbar expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>React App</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setShowOffcanvas(true)}
        >
          <i className="bi bi-list" />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          aria-labelledby="offcanvasNavbarLabel"
          id="offcanvasNavbar"
          onHide={() => setShowOffcanvas(false)}
          show={showOffcanvas}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              React App
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} end to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} end to="/about">
                About
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <>
                    <i
                      className={
                        arrayOfThemes.find(
                          (theme) => theme.name.toLowerCase() === mode
                        )?.icon || 'bi-circle-half'
                      }
                    />{' '}
                  </>
                }
              >
                {arrayOfThemes.map((theme) => {
                  const active = mode === theme.name.toLowerCase();
                  return (
                    <NavDropdown.Item
                      key={theme.name}
                      className={active ? 'active' : ''}
                      onClick={() => {
                        setPreferredTheme(theme.name.toLowerCase());
                      }}
                    >
                      <i className={`me-2 ${theme.icon}`} /> {theme.name}{' '}
                      {active ? <i className="bi bi-check ms-2" /> : null}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
