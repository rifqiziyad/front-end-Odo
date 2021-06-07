import styles from "../../styles/NavbarFooter.module.css";

function Footer(props) {
  return (
    <>
      <footer className={styles.footer}>
        <label>2020 Zwallet. All right reserved.</label>
        <div className={styles.sideRight}>
          <label className={styles.number}>089329472523</label>
          <label>contact@odo.com</label>
        </div>
      </footer>
    </>
  );
}

export default Footer;
