import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by{' '}
        <a href="https://www.linkedin.com/in/chnoumanejaz/" target="blank">
          Nouman Ejaz
        </a>
      </p>
    </footer>
  );
}

export default Footer;
