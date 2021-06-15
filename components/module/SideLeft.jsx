import styles from "../../styles/SideLeft.module.css";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { useState } from "react";
import axiosApiIntances from "utils/axios";
import Swal from "sweetalert2";

function SideLeft(props) {
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const changeTextAmount = (event) => {
    setBalance(parseInt(event.target.value));
  };

  const handleTopup = () => {
    event.preventDefault();
    axiosApiIntances
      .patch(`user/topup/${Cookies.get("user_id")}`, { userTopup: balance })
      .then((res) => {
        Swal.showLoading(Swal.getDenyButton());
        setShow(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.msg,
        });
      })
      .finally(() => {
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Success Top Up",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }, 1000);
      });
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user_id");
    router.push("/landing");
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const handleDashboard = () => {
    router.push("/");
  };

  const handleProfile = () => {
    router.push(`/profile/${Cookies.get("user_id")}`);
  };

  return (
    <>
      <div className={`col-3 ${styles.col3}`}>
        <div className={`col-12 ${styles.sideLeft}`}>
          <label onClick={handleDashboard}>
            <div>
              <img src="/icon-dashboard.png" alt="" />
              <text>Dashboard</text>
            </div>
          </label>
          <label onClick={handleTransfer}>
            <div>
              <img src="/icon-transfer.png" alt="" />
              <text>Transfer</text>
            </div>
          </label>
          <label onClick={handleShow}>
            <div>
              <img src="/icon-topup.png" alt="" />
              <text>Top Up</text>
            </div>
          </label>
          <label onClick={handleProfile}>
            <div>
              <img src="/icon-profile.png" alt="" />
              <text>Profile</text>
            </div>
          </label>
          <section className={styles.logout} onClick={handleLogout}>
            <div>
              <img src="/icon-logout.png" alt="" />
              <text>Logout</text>
            </div>
          </section>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Top up</Modal.Title>
          <Button variant="light" onClick={handleClose}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className={`col-12 ${styles.colRight}`}>
            <form onSubmit={handleTopup}>
              <div className={`mb-3 ${styles.inputPin}`}>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.00"
                  onChange={changeTextAmount}
                  required
                ></input>
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
    </>
  );
}

export default SideLeft;
