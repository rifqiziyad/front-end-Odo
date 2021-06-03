import { useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Login.module.css";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unauthPage } from "../../../middleware/authorizationPage";

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
    <Layout title="Login">
      <div className={`container-fluid ${styles.container}`}>
        <div className="row">
          <div className={`col-6 ${styles.colLeft}`}>Side Left</div>
          <div className={`col-6 ${styles.colRight}`}>
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
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                ></input>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                ></input>
              </div>
              <h4>Forget Password</h4>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
              <h1>
                Don’t have an account?<label htmlFor="">Let’s Sign Up</label>{" "}
              </h1>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
