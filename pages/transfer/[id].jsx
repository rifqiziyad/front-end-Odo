import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Navbar from "../../components/module/Navbar";
import styles from "../../styles/Transfer.module.css";
import axiosApiIntances from "../../utils/axios";
import Footer from "../../components/module/Footer";
import SideLeft from "../../components/module/SideLeft";
import Cookies from "js-cookie";
import { authPage } from "../../middleware/authorizationPage";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const { id } = context.query;

  console.log(id);

  const res = await axiosApiIntances
    .get(`/user/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { receiverData: res }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();

  const handleSubmit = () => {
    Swal.showLoading(Swal.getDenyButton());
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Berhasil DiTransfer",
      });
      router.push("/");
    }, 2000);
  };

  return (
    <Layout title="Trasfer">
      <div className={styles.container}>
        <Navbar />
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <h5>Transfer Money</h5>
            <div className={styles.inputAmount}>
              <img src="/icon-default.png" alt="" />
              <div className={styles.col}>
                <text>{props.receiverData.data[0].user_name}</text>
                <label>{props.receiverData.data[0].user_phone}</label>
              </div>
            </div>
            <h3>
              Type the amount you want to transfer and then press continue to
              the next steps.
            </h3>
            <div className={styles.inputMoney}>
              <input
                className={styles.number}
                type="number"
                placeholder="0.00"
                required
              />
              <input type="text" placeholder="Add some notes" />
            </div>
            <div className={styles.button}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
