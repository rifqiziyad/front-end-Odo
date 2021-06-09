import { useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/module/Navbar";
import styles from "../styles/Home.module.css";
import axiosApiIntances from "../utils/axios";
import { authPage } from "../middleware/authorizationPage";
import Footer from "../components/module/Footer";
import Link from "next/link";
import SideLeft from "../components/module/SideLeft";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const res = await axiosApiIntances
    .get(`/user/${data.user_id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: { user: res }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const handleTopup = () => {
    console.log("topup");
  };

  return (
    <Layout title="Home">
      <Navbar {...props} />
      <div className={styles.container}>
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            {/* <Link href="/">Home</Link> | <Link href="/profile">Profile </Link> |{" "}
            <Link href="/transfer">Transfer </Link>
            <h1 className={styles.titleHead}>Home Page</h1> */}
            <div className="row">
              <div className={`col-12 ${styles.col12}`}>
                <div className={styles.col}>
                  <div className={styles.balance}>
                    <p>Balance</p>
                    <h2>Rp{props.user[0].user_balance}</h2>
                    <h6>{props.user[0].user_phone}</h6>
                  </div>
                  <div className={styles.button} onClick={handleTransfer}>
                    <button className={`btn btn-light ${styles.button1}`}>
                      <img src="/icon-transfer.png" alt="" />
                      Transfer
                    </button>

                    <button class="btn btn-light" onClick={handleTopup}>
                      <img src="/icon-topup.png" alt="" />
                      Top Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`row ${styles.row2}`}>
              <div className={`col-7 ${styles.info}`}>
                <div className={styles.income}>
                  <img src="/icon-income.png" alt="" />
                  <p>Income</p>
                  <h5>-</h5>
                </div>
                <div className={styles.expense}>
                  <img src="/icon-expense.png" alt="" />
                  <p>expense</p>
                  <h5>-</h5>
                </div>
              </div>
              <div className={`col-4 ${styles.history}`}>
                <div className={`nav ${styles.nav}`}>
                  <h4>Transaction History</h4>
                  <label>See all</label>
                </div>
                <h3>No History</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
