export function getPermissionsUser({ role }: { role: "PROVIDER" | "CLIENT" }) {
  switch (role) {
    case "PROVIDER":
      return [
        {
          title: "Meus agendamentos",
          icon: "CalendarOutlined",
          code: "MYAPP",
          link: "/home"
        },
        {
          title: "Meu estabelecimento",
          icon: "ShopOutlined",
          code: "MYBUSI",
          link: '/business'
        },
        {
          title: "Meu perfil",
          icon: "UserOutlined",
          code: "MYPROF",
          link: '/my_profile'
        },
      ];

    case "CLIENT":
      return [
        {
          title: "Meus agendamentos",
          icon: "CalendarOutlined",
          code: "MYAPP",
          link: "/home"
        },
        {
          title: "Meu perfil",
          icon: "UserOutlined",
          code: "MYPROF",
          link: '/my_profile'
        },
      ];

    default: {
      return [];
    }
  }
}
