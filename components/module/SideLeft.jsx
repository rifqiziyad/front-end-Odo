import styles from "../../styles/SideLeft.module.css";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

function SideLeft(props) {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("user_id");
    router.push("/login");
  };

  const handleTransfer = () => {
    router.push("/transfer");
  };

  const handleDashboard = () => {
    router.push("/");
  };

  const handleProfile = () => {
    router.push("/profile");
  };
  const handleTopup = () => {
    router.push("/topup");
  };
  return (
    <>
      <div className={`col-3 ${styles.col3}`}>
        <div className={`col-12 ${styles.sideLeft}`}>
          <label onClick={handleDashboard}>
            <img src="/icon-dashboard.png" alt="" />
            <text>Dashboard</text>
          </label>
          <label onClick={handleTransfer}>
            <img src="/icon-transfer.png" alt="" />
            <text>Transfer</text>
          </label>
          <label onClick={handleTopup}>
            <img src="/icon-topup.png" alt="" />
            <text>Top Up</text>
          </label>
          <label onClick={handleProfile}>
            <img src="/icon-profile.png" alt="" />
            <text>Profile</text>
          </label>
          <label className={styles.logout} onClick={handleLogout}>
            <img src="/icon-logout.png" alt="" />
            <text>Logout</text>
          </label>
        </div>
      </div>
    </>
  );
}

export default SideLeft;
