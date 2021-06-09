import SideLeft from "../../../components/module/SideLeft";
import Navbar from "../../../components/module/Navbar";
import Footer from "../../../components/module/Footer";
import styles from "../../../styles/Transfer.module.css";
import Layout from "../../../components/layout";
import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";

function MyVerticallyCenteredModal(props) {
  const [numIndex] = useState([1, 2, 3, 4, 5, 6]);
  const [userPin, setUserPin] = useState({});

  const changeText = (event) => {
    if (event.target.value) {
      const nextSibling = document.querySelector(
        `input[name='${parseInt(event.target.name, 10) + 1}']`
      );

      if (nextSibling !== null) {
        nextSibling.focus();
      }
    }
    setUserPin({
      ...userPin,
      [`pin${event.target.name}`]: event.target.value,
    });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Pin to Transfer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Enter your 6 digits PIN for confirmation to continue transferring
          money.{" "}
        </p>
        <div className={`col-12 ${styles.colRight}`}>
          <form onSubmit={"handleSubmit"}>
            <div className={`mb-3 ${styles.inputPin}`}>
              {numIndex.map((item, index) => {
                return (
                  <input
                    key={index}
                    type="password"
                    className="form-control"
                    name={item}
                    required
                    maxLength="1"
                    onChange={changeText}
                    pattern="[0-9]"
                    title="Can only enter number"
                  ></input>
                );
              })}
            </div>
            <div className={styles.button}>
              <button type="submit" className="btn btn-primary">
                Continue
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Confirmation(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Layout title="Confirmation">
        <div className={styles.container}>
          <Navbar />
          <div className={`row ${styles.row}`}>
            <SideLeft />
            <div className={`col-8 ${styles.sideRight}`}>
              <h5>Transfer Money</h5>
              <div className={styles.inputAmount}>
                <img src="/icon-default.png" alt="" />
                <div className={styles.col}>
                  <text>Rifqi Ziyad Imtinan</text>
                  <label>08963012331</label>
                </div>
              </div>
              <div className={styles.details}>
                <h6>Details</h6>
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
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Continue
                </Button>

                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
}
