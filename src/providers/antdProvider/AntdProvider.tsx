"use client";

import { ConfigProvider, ThemeConfig } from "antd";
import { ReactNode } from "react";

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
    },
  };

  return (
    <ConfigProvider theme={data}>
      {children}
    </ConfigProvider>
  );
}
