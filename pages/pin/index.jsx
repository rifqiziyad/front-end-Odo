import { useState } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Pin.module.css";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unauthPage } from "../../middleware/authorizationPage";
import Image from "next/image";
// import axiosApiIntances from "../../../utils/axios";
import Swal from "sweetalert2";
// import pincodeInput from "bootstrap-pincode-input";

// export async function getServerSideProps(context) {
//   await unauthPage(context);
//   return { props: {} };
// }

export default function Pin() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const handleLogin = (event) => {
    event.preventDefault();
    // proses axios
    axiosApiIntances
      .post("/auth/login", form)
      .then((res) => {
        router.push("/");
        Cookie.set("token", res.data.data.token, { expires: 7, secure: true });
        Cookie.set("user", res.data.data.user_id, { expires: 7, secure: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.response.data.msg,
        });
      });
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Layout title="Pin">
      <div className={`container-fluid ${styles.container}`}>
        <div className="row">
          <div className={`col-7 ${styles.colLeft}`}>
            <h1>Odo</h1>
            <Image
              src="/img-phone.svg"
              alt="Picture of the author"
              width={500}
              height={350}
            />
            <h2>App that Covering Banking Needs.</h2>
            <p>
              Odo is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in Odo everyday with worldwide
              users coverage.
            </p>
          </div>
          <div className={`col-5 ${styles.colRight}`}>
            <h2>
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h2>
            <h6>
              Create 6 digits pin to secure all your money and your data in
              Zwallet app. Keep it secret and don’t tell anyone about your
              Zwallet account password and the PIN.
            </h6>
            <form onSubmit={handleLogin}>
              <div className={`mb-3 ${styles.inputPin}`}>
                <input
                  type="password"
                  className="form-control"
                  required
                  maxLength="1"
                ></input>
                <input
                  type="password"
                  className="form-control"
                  required
                  maxLength="1"
                ></input>
                <input
                  type="password"
                  className="form-control"
                  required
                  maxLength="1"
                ></input>
                <input
                  type="password"
                  className="form-control"
                  required
                  maxLength="1"
                ></input>
              </div>
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
