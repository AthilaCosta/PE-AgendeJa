import styles from "./SideBar.module.css";
import logo from "../../assets/logo.png";
import {
  CalendarOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ISideBarProps } from "./interface";

export default function SideBar({ retracted, setRetracted }: ISideBarProps) {
  return (
    <div className={styles["container"]}>
      <div
        className={retracted ? styles["sidebar_retracted"] : styles["sidebar"]}
      >
        <img className={styles["logo"]} src={logo}></img>

        <div>
          <div
            className={
              retracted ? styles["menu_item_retracted"] : styles["menu_item"]
            }
          >
            {
              <CalendarOutlined
                className={
                  retracted
                    ? styles["icon_sidebar_retracted"]
                    : styles["icon_sidebar"]
                }
              />
            }
            {!retracted && (
              <span className={styles["menu_item_text"]}>
                Meus agendamentos
              </span>
            )}
          </div>
          <div
            className={
              retracted ? styles["menu_item_retracted"] : styles["menu_item"]
            }
          >
            {
              <ShopOutlined
                className={
                  retracted
                    ? styles["icon_sidebar_retracted"]
                    : styles["icon_sidebar"]
                }
              />
            }
            {!retracted && (
              <span className={styles["menu_item_text"]}>Meu negócio</span>
            )}
          </div>
          <div
            className={
              retracted ? styles["menu_item_retracted"] : styles["menu_item"]
            }
          >
            {
              <UserOutlined
                className={
                  retracted
                    ? styles["icon_sidebar_retracted"]
                    : styles["icon_sidebar"]
                }
              />
            }
            {!retracted && (
              <span className={styles["menu_item_text"]}>Meu perfil</span>
            )}
          </div>
        </div>
        <div className={styles["logout_button_container"]}>
          <div className={styles["logout_button"]}>
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
