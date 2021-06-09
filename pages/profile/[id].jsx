import Layout from "../../components/Layout";
import Navbar from "../../components/module/Navbar";
import axiosApiIntances from "../../utils/axios";
import { useState } from "react";
import styles from "../../styles/Profile.module.css";
import SideLeft from "../../components/module/SideLeft";
import Footer from "../../components/module/Footer";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axiosApiIntances
    .get(`users/${id}`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  return {
    props: { user: res },
  };
}

export default function Profile(props) {
  const [user, setUser] = useState(props.user);
  const profile = [
    "Personal Information",
    "Change Password",
    "Change PIN",
    "Logout",
  ];

  return (
    <Layout title="Profile">
      <div className={styles.container}>
        <Navbar />
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <img src="/img-profile.png" alt="" className={styles.profile} />
            <div className={styles.edit}>
              <img src="/icon-edit.png" alt="" />
              <label>Edit</label>
            </div>
            <h2>Rifqi Ziyad Imtinan</h2>
            <h5>08394724756</h5>
            {profile.map((item, index) => {
              return (
                <div className={styles.info} key={index}>
                  <h2>{item}</h2>
                  <img src="/icon-arrow-left.png" alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
