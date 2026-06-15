import type { Project } from "../../shared/types/types";
import { MOCK_PROJECT } from "../../shared/utils/mockData";

export default function useProjects() {
  const projects = useState<Project[]>("projects", () => [MOCK_PROJECT]);

  const createProject = () => {
    const id = (projects.value.length + 1)?.toString();
    const project = {
      id,
      name: `New Project ${id}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projects.value.push(project);

    return project;
  };

  const createProjectAndNavigate = async () => {
    const project = createProject();
    await navigateTo(`/projects/${project.id}`);
  };

  return {
    projects,
    createProject,
    createProjectAndNavigate,
  };
}
