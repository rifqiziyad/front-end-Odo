import SideLeft from "../../../components/module/SideLeft";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import styles from "../../../styles/Transfer.module.css";
import Layout from "../../../components/layout";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const { id, n, b, datetime } = context.query;

  const res = await axiosApiIntances
    .get(`/user/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const resUserById = await axiosApiIntances
    .get(`/user/${data.user_id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });
  return {
    props: {
      userReceiver: res,
      user: resUserById,
      balance: b,
      notes: n,
      dateTime: datetime,
    }, // will be passed to the page component as props
  };
}

export default function Success(props) {
  const router = useRouter();
  const handleHome = () => {
    router.push("/");
  };

  const convertToIdr = (number) => {
    let number_string = number.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      const separator = sisa ? "." : "";
      return (rupiah += separator + ribuan.join("."));
    }
  };

  return (
    <>
      <Layout title="Transfer | Success">
        <Navbar {...props} />
        <div className={styles.container}>
          <div className={`row ${styles.row}`}>
            <SideLeft />
            <div className={`col-8 ${styles.sideRight}`}>
              <div className={styles.success}>
                <img src="/success.png" alt="" />
                <h4>Transfer Success</h4>
              </div>
              <div className={styles.details}>
                <p>Amount</p>
                <h5>Rp{props.balance}</h5>
                <hr />
                <p>Balance Left</p>
                <h5>
                  Rp
                  {convertToIdr(
                    parseInt(props.user[0].user_balance) -
                      parseInt(props.balance)
                  )}
                </h5>
                <hr />
                <p>Date & time</p>
                <h5>{props.dateTime}</h5>
                <hr />
                <p>Notes</p>
                <h5>{props.notes}</h5>
                <hr />
              </div>
              <div className={styles.button}>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btnPdf}`}
                >
                  <img src="/icon-share.png" alt="" />
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btn} ${styles.btnPdf}`}
                >
                  Download PDF
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btn}`}
                  onClick={handleHome}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
}
