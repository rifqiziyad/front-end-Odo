import styles from "styles/PersonalInfo.module.css";
import SideLeft from "components/module/SideLeft";
import Footer from "components/module/Footer";
import Navbar from "components/module/Navbar";
import Layout from "components/layout";
import axiosApiIntances from "utils/axios";
import { useState } from "react";
// import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

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

export default function pesonalInfo(props) {
  // const router = useRouter();
  const [data, setData] = useState({});

  const changeText = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  console.log(data);

  return (
    <Layout title="Profile">
      <div className={styles.container}>
        <Navbar {...props} />
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8`}>
            <div className={styles.sideRight}>
              <h1>Personal Information</h1>
              <p>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </p>
              <form>
                <h4>Name</h4>
                <input
                  type="text"
                  value={props.user[0].user_name}
                  name="userName"
                  onChange={(event) => changeText(event)}
                />

                <h4>Email</h4>
                <input
                  type="email"
                  value={props.user[0].user_email}
                  name="userEmail"
                  onChange={(event) => changeText(event)}
                />

                <h4>Phone Number</h4>
                <input
                  type="text"
                  value={props.user[0].user_phone}
                  name="userPhone"
                  onChange={(event) => changeText(event)}
                />

                <Button variant="light">Update</Button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
