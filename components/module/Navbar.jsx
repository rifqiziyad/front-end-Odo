import { useRouter } from "next/router";
import styles from "styles/NavbarFooter.module.css";

function Navbar(props) {
  const router = useRouter();

  const handleProfile = () => {
    router.push(`/profile/${props.user[0].user_id}`);
  };

  return (
    <>
      {/* <Link href="/">Home</Link> | <Link href="/profile">Profile </Link> */}
      <div className={`container-fluid ${styles.container}`}>
        <div className={`row ${styles.row1}`}>
          <div className={`col-4 ${styles.col1}`}>Odo</div>
          <div className={`col-4 ${styles.col2}`} onClick={handleProfile}>
            {props.user[0].user_image ? (
              <img
                src={`https://odo-wallet.herokuapp.com/backend4/api/${props.user[0].user_image}`}
                alt=""
              />
            ) : (
              <img src="/icon-default.png" alt="" />
            )}
            <div>
              <h5>{props.user[0].user_name}</h5>
              {props.user[0].user_phone ? (
                <h6>{props.user[0].user_phone}</h6>
              ) : (
                <h6>-</h6>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
