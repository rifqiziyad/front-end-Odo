import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/module/Navbar";
import styles from "../../styles/Transfer.module.css";
import axiosApiIntances from "../../utils/axios";
import Footer from "../../components/module/Footer";
import SideLeft from "../../components/module/SideLeft";
import Cookies from "js-cookie";

export async function getServerSideProps(context) {
  const res = await axiosApiIntances
    .get(
      `/user?userId=${Cookies.get(
        "user_id"
      )}&page=1&limit=10&search=&sort=user_id `
    )
    .then((res) => {
      return res.data;
      // console.log(res.data);
    })
    .catch((err) => {
      return [];
      // console.log(err.response.data.msg);
    });
  return {
    props: { receiverData: res }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log(props);

  useEffect(() => {
    console.log("use effect");
  }, []);

  return (
    <Layout title="Trasfer">
      <div className={styles.container}>
        <Navbar />
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <h5>Search Receiver</h5>
            <input type="search" placeholder="Search receiver here" />
            {/* {receiverData.map((item, index) => {
              return (
                <div className={styles.outputSearch} key={index}>
                  <img src="/img-profile.png" alt="" />
                  <div className={styles.col}>
                    <text>{item.user_name}</text>
                    <label>{item.user_phone}</label>
                  </div>
                </div>
              );
            })} */}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
