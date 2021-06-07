import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import styles from "../../styles/NavbarFooter.module.css";

export default function Navbar() {
  const router = useRouter();

  // const handleLogout = () => {
  //   Cookie.remove("token");
  //   Cookie.remove("user_id");
  //   router.push("/login");
  // };
  return (
    <>
      {/* <Link href="/">Home</Link> | <Link href="/profile">Profile </Link> */}
      <div className={`container-fluid ${styles.container}`}>
        <div className={`row ${styles.row1}`}>
          <div className={`col-4 ${styles.col1}`}>Odo</div>
          <div className={`col-4 ${styles.col2}`}>
            <img src="/img-profile.png" alt="" />
            <div>
              <h5>Rifqi Ziyad Imtinan</h5>
              <h6>09823120312</h6>
            </div>
            <img className={styles.imgBell} src="/bell.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
