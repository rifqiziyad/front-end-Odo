import SideLeft from "../../../components/module/SideLeft";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import styles from "../../../styles/Transfer.module.css";
import Layout from "../../../components/layout";
import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";

export default function Success(props) {
  return (
    <>
      <Layout title="Transfer | Success">
        <div className={styles.container}>
          <Navbar />
          <div className={`row ${styles.row}`}>
            <SideLeft />
            <div className={`col-8 ${styles.sideRight}`}>
              <div className={styles.success}>
                <img src="/success.png" alt="" />
                <h4>Transfer Success</h4>
              </div>
              <div className={styles.details}>
                <p>Amount</p>
                <h5>Rp100.000</h5>
                <hr />
                <p>Balance Left</p>
                <h5>Rp20.000</h5>
                <hr />
                <p>Date & time</p>
                <h5>May 11, 2020 - 12.00</h5>
                <hr />
                <p>Notes</p>
                <h5>For Buying some socks</h5>
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
