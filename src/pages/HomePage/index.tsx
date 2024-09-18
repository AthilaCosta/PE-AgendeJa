import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div
      style={{
        fontSize: "25px",
        color: "#EBD3F8",
        fontWeight: "800",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Usuário logado!
      <Link
        to={"/"}
        onClick={() => {
          localStorage.setItem("user_logged", "false");
        }}
      >
        Voltar para o login.
      </Link>
    </div>
  );
}
