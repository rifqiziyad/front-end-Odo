import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "components/layout";
import styles from "styles/Landing.module.css";
import { Button } from "react-bootstrap";
import { unauthPage } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Landing() {
  const router = useRouter();

  const handleLogin = () => {
    event.preventDefault();
    router.push("/login");
  };

  const handleRegister = () => {
    event.preventDefault();
    router.push("/register");
  };

  return (
    <Layout title="Odo">
      <div className={`container-fluid ${styles.container}`}>
        <div className={`row ${styles.row}`}>
          <div className={`col-4 ${styles.navbarLeft}`}>Odo</div>
          <div className={`col-3 ${styles.navbarRight}`}>
            <Button
              variant="light"
              className={styles.btnLogin}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="light"
              className={styles.btnSignup}
              onClick={handleRegister}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className={`row ${styles.row2}`}>
          <div className={`col-5 ${styles.col5}`}>
            <img
              className={styles.image}
              src={"/img-landing-page.png"}
              width={280}
            />
          </div>
          <div className={`col-7 ${styles.colSideRight}`}>
            <div>
              <div className={styles.h4}>
                Awesome App For Saving <span>Time.</span>
              </div>
              <p>
                We bring you a mobile app for banking problems that oftenly
                wasting much of your times.
              </p>
              <Button className={styles.btn} variant="light">
                Try It Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
