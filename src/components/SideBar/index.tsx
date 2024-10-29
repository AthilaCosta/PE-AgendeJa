import styles from "./SideBar.module.css";
import logo from "../../assets/logo.png";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { ISideBarProps } from "./interface";
import ButtonLink from "./ButtonsLink";
import { getPermissionsUser } from "../../configs/permissionDict";

export default function SideBar({
  retracted,
  setRetracted,
  userData,
}: ISideBarProps) {
  const user = userData;

  const permissions = getPermissionsUser({
    role: user.role as "PROVIDER" | "CLIENT",
  });

  return (
    <div className={styles["container"]}>
      <div
        className={retracted ? styles["sidebar_retracted"] : styles["sidebar"]}
      >
        <img className={styles["logo"]} src={logo}></img>

        <div>
          {permissions.map((permission) => (
            <ButtonLink
              key={permission.code}
              title={permission.title}
              icon={permission.icon}
              code={permission.code}
              link={permission.link}
              retracted={retracted}
            />
          ))}
        </div>
        <div className={styles["logout_button_container"]}>
          <div
            className={styles["logout_button"]}
            onClick={() => {
              localStorage.removeItem("user_data");
              localStorage.setItem("user_logged", "false");
              window.location.replace("/");
            }}
          >
            <LogoutOutlined
              style={{
                marginRight: "0.5rem",
              }}
            />
            Sair
          </div>
        </div>
      </div>
      <div
        className={styles["retract_button"]}
        onClick={() => setRetracted(!retracted)}
      >
        {retracted ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </div>
  );
}
