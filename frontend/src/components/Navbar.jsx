import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        {/* Logo will go here */}
        <h1>Logo</h1>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}><a href="#home" style={styles.navLink}>Home</a></li>
        <li style={styles.navItem}><a href="#events" style={styles.navLink}>Events</a></li>
        <li style={styles.navItem}><a href="#media" style={styles.navLink}>Media</a></li>
        <li style={styles.navItem}><a href="#team" style={styles.navLink}>Meet the Team</a></li>
        <li style={styles.navItem}><a href="#contact" style={styles.navLink}>Contact Us</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default Navbar;