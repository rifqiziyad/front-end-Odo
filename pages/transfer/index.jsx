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
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const res = await axiosApiIntances
    .get(`/user?userId=${data.user_id}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });

  const resUserById = await axiosApiIntances
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

  return {
    props: { receiverData: res, user: resUserById }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const router = useRouter();
  const [receiver, setReceiver] = useState(props.receiverData.data);
  const [search, setSearch] = useState(router.query.search || "");
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [sort, setSort] = useState("");
  const [totalPage, setTotalPage] = useState(
    props.receiverData.pagination.totalPage
  );

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
      setPage(1);
      router.push(
        `/transfer?search=${
          event.target.value
        }&page=${1}&limit=${limit}&sort=${sort}`
      );
    }
  };

  useEffect(() => {
    router.push("/transfer");
  }, []);

  useEffect(() => {
    getData();
  }, [search, page, sort]);

  const getData = () => {
    axiosApiIntances
      .get(
        `/user?userId=${Cookies.get(
          "user_id"
        )}&page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      )
      .then((res) => {
        setReceiver(res.data.data);
        setTotalPage(res.data.pagination.totalPage);
      })
      .catch((err) => {
        return err.response;
      });
  };

  const handleTransfer = (id) => {
    router.push(`transfer/${id}`);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
  };

  const handleSelectedValue = () => {
    var selectBox = document.getElementById("selectBox");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    setSort(selectedValue);
  };

  return (
    <Layout title="Trasfer">
      <Navbar {...props} />
      <div className={styles.container}>
        <div className={`row ${styles.row}`}>
          <SideLeft />
          <div className={`col-8 ${styles.sideRight}`}>
            <h5>Search Receiver</h5>
            <div className={styles.inputSearch}>
              <input
                type="search"
                placeholder="Search receiver here"
                onKeyPress={handleSearch}
              />

              <select id="selectBox" onChange={handleSelectedValue}>
                <option value="user_name ASC">Name A-Z</option>
                <option value="user_name DESC">Name Z-A</option>
              </select>
            </div>
            <div className={styles.resultSearch}>
              {receiver.length > 0 ? (
                receiver.map((item, index) => {
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
                })
              ) : (
                <h2 style={{ textAlign: "center" }}>Nama tidak ditemukan</h2>
              )}
            </div>
            <div>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
}
