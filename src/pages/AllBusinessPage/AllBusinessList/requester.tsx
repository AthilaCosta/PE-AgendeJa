import { serverConnection } from "../../../configs/connectionServerConfig";

export function BusinessListEntities() {
  let entities: Record<string, unknown>[] = [];

  serverConnection({
    suffixUrl: "businesses",
    method: "GET",
  }).then((response) => {
    entities = response.data as Record<string, unknown>[];
  });

  return entities;
}
