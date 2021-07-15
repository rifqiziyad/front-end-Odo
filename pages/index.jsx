import Layout from "components/layout";
import Navbar from "components/module/Navbar";
import styles from "styles/Home.module.css";
import axiosApiIntances from "utils/axios";
import { authPage } from "middleware/authorizationPage";
import Footer from "components/module/Footer";
import SideLeft from "components/module/SideLeft";
import { useRouter } from "next/router";
import ChartHome from "components/module/Chart";
import Cookies from "js-cookie";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const res = await axiosApiIntances
    .get(`/user/${data.user_id}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const resTransaction = await axiosApiIntances
    .get(`/transaction/${data.user_id}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  const dataForChart = await axiosApiIntances
    .get(`transaction/day/${data.user_id}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: {
      user: res,
      transactionData: resTransaction,
      dataByDay: dataForChart,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);

  const changeTextAmount = (event) => {
    setBalance(parseInt(event.target.value));
  };

  const handleTopup = (event) => {
    event.preventDefault();
    axiosApiIntances
      .patch(
        `user/topup/${Cookies.get("user_id")}`,
        { userTopup: balance },
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
      .then(() => {
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
        });
      });
  };

  const handleTransfer = (event) => {
    event.preventDefault();
    router.push("/transfer");
  };

  const redirectHistoryPage = () => {
    event.preventDefault();
    router.push(`/history/${props.user[0].user_id}`);
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
    <Layout title="Home">
      <Navbar {...props} />
      <div className={styles.container}>
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <div className="row">
              <div className={`col-12 ${styles.col12}`}>
                <div className={styles.col}>
                  <div className={styles.balance}>
                    <p>Balance</p>
                    {props.user[0].user_balance != 0 ? (
                      <h2>Rp{convertToIdr(props.user[0].user_balance)}</h2>
                    ) : (
                      <h2>Rp0</h2>
                    )}
                    {props.user[0].user_phone ? (
                      <h6>{props.user[0].user_phone}</h6>
                    ) : (
                      <h6>-</h6>
                    )}
                  </div>
                  <div className={styles.button}>
                    <button
                      className={`btn btn-light ${styles.button1}`}
                      onClick={handleTransfer}
                    >
                      <img src="/icon-transfer.png" alt="" />
                      Transfer
                    </button>

                    <button className="btn btn-light" onClick={handleShow}>
                      <img src="/icon-topup.png" alt="" />
                      Top Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`row ${styles.row2}`}>
              <div className={`col-7 ${styles.info}`}>
                <div className={styles.infoRow}>
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
                <ChartHome {...props} />
              </div>
              <div className={`col-4 ${styles.historyMain}`}>
                <div className={styles.history}>
                  <div className={`nav ${styles.nav}`}>
                    <h4>Transaction History</h4>
                    <label
                      className={styles.seeAll}
                      onClick={redirectHistoryPage}
                    >
                      See all
                    </label>
                  </div>

                  {props.transactionData.length > 0 ? (
                    props.transactionData.map((item, index) => (
                      <div className={styles.historyCol} key={index}>
                        <div className={styles.myHistory}>
                          {item.user_image ? (
                            <img
                              src={`https://odo-wallet.herokuapp.com/backend4/api/${item.user_image}`}
                              alt=""
                            />
                          ) : (
                            <img src="/icon-default.png" alt="" />
                          )}
                          <div className={styles.colHistory}>
                            <h6>{item.user_name}</h6>
                            <label>Transfer</label>
                          </div>
                        </div>
                        {item.transaction_receiver_id ==
                        props.user[0].user_id ? (
                          <h2>+{convertToIdr(item.transaction_amount)}</h2>
                        ) : (
                          <h2 className={styles.minus}>
                            -{convertToIdr(item.transaction_amount)}
                          </h2>
                        )}
                      </div>
                    ))
                  ) : (
                    <h4>No History</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
              <div className={styles.buttonTopup}>
                <button type="submit" className="btn btn-primary">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}
