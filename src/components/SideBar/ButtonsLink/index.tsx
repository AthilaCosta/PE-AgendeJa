import {
  CalendarOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "../SideBar.module.css";

interface ButtonLinkProps {
  title: string;
  icon: string;
  code: string;
  link: string;
  retracted: boolean;
}

export function ButtonLink({ title, icon, link, retracted }: ButtonLinkProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "CalendarOutlined":
        return (
          <CalendarOutlined
            className={
              retracted
                ? styles["icon_sidebar_retracted"]
                : styles["icon_sidebar"]
            }
          />
        );
      case "ShopOutlined":
        return (
          <ShopOutlined
            className={
              retracted
                ? styles["icon_sidebar_retracted"]
                : styles["icon_sidebar"]
            }
          />
        );
      case "UserOutlined":
        return (
          <UserOutlined
            className={
              retracted
                ? styles["icon_sidebar_retracted"]
                : styles["icon_sidebar"]
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={
        retracted ? styles["menu_item_retracted"] : styles["menu_item"]
      }
      onClick={() => window.location.replace(link)}
    >
      {renderIcon(icon)}
      {!retracted && <span className={styles["menu_item_text"]}>{title}</span>}
    </div>
  );
}

export default ButtonLink;
