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

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const res = await axiosApiIntances
    .get(`/user?userId=${data.user_id}&page=1&limit=10&search=&sort=user_id `)
    .then((res) => {
      return res.data;
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
    props: { receiverData: res, user: resUserById }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();
  const [receiver, setReceiver] = useState(props.receiverData.data);
  const [search, setSearch] = useState(router.query.search || "");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      router.push(`/transfer?search=${event.target.value}`);
    }
  };

  useEffect(() => {
    getData(search);
  }, [search]);

  const getData = (searching) => {
    axiosApiIntances
      .get(
        `/user?userId=${Cookies.get(
          "user_id"
        )}&page=1&limit=10&search=${searching}&sort=user_id `
      )
      .then((res) => {
        setReceiver(res.data.data);
      });
  };

  const handleTransfer = (id) => {
    router.push(`transfer/${id}`);
  };

  return (
    <Layout title="Trasfer">
      <Navbar {...props} />
      <div className={styles.container}>
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <h5>Search Receiver</h5>
            <input
              type="search"
              placeholder="Search receiver here"
              onKeyPress={handleSearch}
            />
            {receiver.map((item, index) => {
              if (receiver.length > 0) {
                return (
                  <div
                    className={styles.outputSearch}
                    key={index}
                    onClick={() => handleTransfer(item.user_id)}
                  >
                    {item.user_image ? (
                      <img
                        src={`http://localhost:3004/backend4/api/${item.user_image}`}
                        alt=""
                      />
                    ) : (
                      <img src="/icon-default.png" alt="" />
                    )}

                    <div className={styles.col}>
                      <h5>{item.user_name}</h5>
                      <label>{item.user_phone}</label>
                    </div>
                  </div>
                );
              } else {
                return <h2>Nama tidak ditemukan</h2>;
              }
            })}
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
