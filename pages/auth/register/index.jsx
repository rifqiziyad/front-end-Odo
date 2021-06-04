import { useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Register.module.css";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unauthPage } from "../../../middleware/authorizationPage";
import Image from "next/image";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ userEmail: "", userPassword: "" });

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {
      user_id: 1,
    };
    // proses axios
    Cookie.set("token", "TestingToken", { expires: 7, secure: true });
    Cookie.set("user", data.user_id, { expires: 7, secure: true });
    router.push("/");
  };

  return (
    <Layout title="Register">
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
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </h2>
            <h6>
              Transfering money is eassier than ever, you can access Zwallet
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </h6>
            <form>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your username"
                ></input>
              </div>
              <div class="mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your e-mail"
                ></input>
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                ></input>
              </div>
              <button type="submit" class="btn btn-primary">
                Sign Up
              </button>
              <h1>
                Already have an account? <label htmlFor="">Let’s Login</label>{" "}
              </h1>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
