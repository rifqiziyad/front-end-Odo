import styles from "styles/History.module.css";
import SideLeft from "components/module/SideLeft";
import Footer from "components/module/Footer";
import Navbar from "components/module/Navbar";
import Layout from "components/layout";
import axiosApiIntances from "utils/axios";
import { useState } from "react";
// import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axiosApiIntances
    .get(`user/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return {};
    });

  return {
    props: { user: res },
  };
}

export default function History(props) {
  return (
    <Layout title="History">
      <Navbar {...props} />
      <div className={styles.container}>
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRightMain}`}>
            <div className={styles.sideRight}>
              <h1>Transaction History</h1>
              <div className="byWeek">
                <p>This Week</p>

                <div className={styles.historyCol}>
                  <div className={styles.myHistory}>
                    <img src="/img-profile.png" alt="" />
                    <div className={styles.colHistory}>
                      <h6>Rifqi</h6>
                      <label>Transfer</label>
                    </div>
                  </div>
                  <h2>+250000</h2>
                </div>
                <div className={styles.historyCol}>
                  <div className={styles.myHistory}>
                    <img src="/img-profile.png" alt="" />
                    <div className={styles.colHistory}>
                      <h6>Rifqi</h6>
                      <label>Transfer</label>
                    </div>
                  </div>
                  <h2>+250000</h2>
                </div>
              </div>

              <div className="byWeek">
                <p>This Month</p>

                <div className={styles.historyCol}>
                  <div className={styles.myHistory}>
                    <img src="/img-profile.png" alt="" />
                    <div className={styles.colHistory}>
                      <h6>Rifqi</h6>
                      <label>Transfer</label>
                    </div>
                  </div>
                  <h2>+250000</h2>
                </div>
                <div className={styles.historyCol}>
                  <div className={styles.myHistory}>
                    <img src="/img-profile.png" alt="" />
                    <div className={styles.colHistory}>
                      <h6>Rifqi</h6>
                      <label>Transfer</label>
                    </div>
                  </div>
                  <h2>+250000</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
