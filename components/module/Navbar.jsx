// import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/NavbarFooter.module.css";
import axiosApiIntances from "../../utils/axios";

export async function getServerSideProps(context) {
  const data = await authPage(context);

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

  const getDataUser = () => {
    axiosApiIntances
      .get(`/user/${Cookies.get("user_id")}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  // useEffect(() => {
  //   getDataUser();
  // }, []);

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
