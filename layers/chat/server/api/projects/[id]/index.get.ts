import { getProjectById } from "../../../repository/projectRepository";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    return;
  }
  return getProjectById(id);
});
