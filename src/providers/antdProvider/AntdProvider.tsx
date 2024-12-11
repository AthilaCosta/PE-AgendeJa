"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import { ReactNode } from "react";
import ptBR from "antd/lib/locale/pt_BR";

interface IAntDesignProviderProps {
  children: ReactNode;
}

export function AntDesignProvider({ children }: IAntDesignProviderProps) {
  const data: ThemeConfig = {
    components: {
      Input: {
        colorTextPlaceholder: "#EBD3F8",
        colorBgContainer: "#AD49E1",
        zIndexBase: 0,
      },
      Calendar: {
        colorBgContainer: "#AD49E1",
        colorText: "#EBD3F8",
        colorBgBlur: "#2E073F",
      },
      Table: {
        colorBgBase: "#ff4b4b",
        colorBgContainer: "#EBD3F8",
      },
      DatePicker: {
        colorTextPlaceholder: "#EBD3F8",
        colorBgContainer: "#AD49E1",
        zIndexBase: 0,
        colorIcon: "#EBD3F8",
        colorIconHover: "#EBD3F8",
        fontSizeIcon: 16,
        hoverBorderColor: "",
      },
    },
  };

  return (
    <ConfigProvider locale={ptBR} theme={data}>
      {children}
    </ConfigProvider>
  );
}
