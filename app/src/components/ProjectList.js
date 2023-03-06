import React, { useState, useEffect } from "react";
import axios from "axios";
function ProjectList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get("/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleAddProject = () => {
    const newTitle = prompt("Enter project title:");
    const newDescription = prompt("Enter project description:");
    const newLanguage = prompt("Enter project language:");
    const newUser_id = prompt("Enter user id:");
    const newProject = {
      project_title: newTitle,
      project_description: newDescription,
      project_language: newLanguage,
      user_id: newUser_id,
    };
    axios
      .post("/projects", newProject)
      .then((response) => setProjects([...projects, response.data]))
      .catch((error) => console.log(error));
  };
  const handleUpdateProject = (id) => {
    const projectToUpdate = projects.find((project) => project.id === id);
    const newTitle = prompt("Enter new title:", projectToUpdate.project_title);
    const newDescription = prompt("Enter new description:", projectToUpdate.project_description);
    const newLanguage = prompt("Enter new language:", projectToUpdate.project_language);
    const newUser_id = prompt("Enter new user id:", projectToUpdate.user_id);
    const updatedProject = {
      project_title: newTitle,
      project_description: newDescription,
      project_language: newLanguage,
      user_id: newUser_id,
    };
    axios
      .patch(`https://phase-three-sinatra-project.onrender.com/projects/${id}`, updatedProject)
      .then((response) => {
        const updatedProjects = projects.map((project) =>
          project.id === id ? response.data : project
        );
        setProjects(updatedProjects);
      })
      .catch((error) => console.log(error));
  };
  const handleDeleteProject = (id) => {
    axios
      .delete(`https://phase-three-sinatra-project.onrender.com/projects/${id}`)
      .then(() => {
        const updatedProjects = projects.filter((project) => project.id !== id);
        setProjects(updatedProjects);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.project_title}</h3>
            <p>{project.project_description}</p>
            <p>{project.project_language}</p>
            <p>user id: {project.user_id}</p>
            <button onClick={() => handleUpdateProject(project.id)}>Update</button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddProject}>Add Project</button>
    </div>
  );
}
export default ProjectList;