// import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axiosApiIntances from "utils/axios";
import styles from "../../styles/NavbarFooter.module.css";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  console.log(data);

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

export default function Navbar(props) {
  const [userData, setUserData] = useState();

  useEffect(() => {
    axiosApiIntances.get(`/user/${Cookies.get("user_id")}`).then((res) => {
      setUserData(res.data.data[0]);
    });
  }, []);
  // console.log(userData);

  return (
    <>
      {/* <Link href="/">Home</Link> | <Link href="/profile">Profile </Link> */}
      <div className={`container-fluid ${styles.container}`}>
        <div className={`row ${styles.row1}`}>
          <div className={`col-4 ${styles.col1}`}>Odo</div>
          <div className={`col-4 ${styles.col2}`}>
            {/* {props.user[0].user_image ? (
              <img
                src={`http://localhost:3004/backend4/api/${props.user[0].user_image}`}
                alt=""
              />
            ) : ( */}
            <img src="/img-profile.png" alt="" />
            {/* )} */}

            <div>
              {/* <h5>{userData[0].user_name}</h5> */}
              {/* <h5>{props.user[0].user_name}</h5>
              <h6>{props.user[0].user_phone}</h6> */}
            </div>
            <img className={styles.imgBell} src="/bell.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
