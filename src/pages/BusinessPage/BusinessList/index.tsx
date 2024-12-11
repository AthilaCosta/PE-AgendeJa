import { useEffect, useState } from "react";
import { TableCard } from "../../../components/Table/tableCard";
import { serverConnection } from "../../../configs/connectionServerConfig";
import { closeLoader, openLoader } from "../../../components/Loading/Loading";

export default function BusinessList() {
  const [entities, setEntities] = useState<Record<string, unknown>[]>([]);
  const userData = JSON.parse(localStorage.getItem("user_data") as string);

  useEffect(() => {
    openLoader();
    serverConnection({
      suffixUrl: `/businesses/registered/${userData.id}`,
      method: "GET",
    })
      .then((response) => {
        setEntities(response.data as Record<string, unknown>[]);
      })
      .finally(() => {
        closeLoader();
      });
  }, []);

  return (
    <>
      <TableCard
        title={{ title: "Meu estabelecimento", create: "/business/create" }}
        columns={[
          {
            value: "businessName",
            placeholder: "Digite um valor",
            label: "Nome",
          },
          { value: "businessDescription", placeholder: "Digite um valor", label: "Descrição" },
          {
            value: "businessPhoneNumber",
            placeholder: "Digite um valor",
            label: "Telefone",
          },
          {
            type: "actions",
            label: "Ações",
            actions: [
              {
                label: "Editar",
                onClick: (record: Record<string, unknown>) => {
                  const id = record.businessId as string; // Certifique-se de que o ID está presente nos dados
                  console.log(record)
                  window.location.replace(`/business/create/${id}`);
                },              },
              {
                label: "Excluir",
                onClick: () => console.log("Editar"),
              },
            ],
          },
        ]}
        data={entities}
      />
    </>
  );
}
