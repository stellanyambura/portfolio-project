import { useEffect, useState } from "react";

function ProjectList({ currentUserEmail }) {
  const [data, setData] = useState({});

  console.log(currentUserEmail);
  // skill input value
  let [skillName, setSkillName] = useState("");
  let [skillDescription, setSkillDescription] = useState("");

  // projects values
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  useEffect(() => {
    fetch(`https://phase-three-sinatra-project.onrender.com/user/${currentUserEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data["skills"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUserEmail]);

  // user details
  let name = data["first_name"] + " " + data["last_name"];
  let skillsGroup = data["skills"];
  let projectsList = data["projects"];
  let id = data["id"];

  // deleting skills
  let handleDeleteSkill = (skill_id) => {
    fetch(
      `https://phase-three-sinatra-project.onrender.com/destroy/skills/${id}/${skill_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  let skills;
  if (skillsGroup === undefined || skillsGroup === null) {
    skills = (
      <div
      >
        <h2>Add new skill</h2>
      </div>
    );
  } else {
    skills = skillsGroup.map((item) => (
      <div className="skill">
        <span id="skill-details-span">
          <h3 id="skill_name" spellCheck="false">
            {item.name}
          </h3>
          <h5 id="skill_description" spellCheck="false">
            {item.description}
          </h5>
        </span>
        <span id="skill_options">
         <h5 onClick={(e)=>{
          e.target.parentElement.parentNode.remove()
          handleDeleteSkill(item.id)
         }}>Delete</h5>
         <h5>Edit</h5>
        </span>
      </div>
    ));
  }

  let handleDeletingProject = (project_id) => {
    fetch(
      `https://phase-three-sinatra-project.onrender.com/users/${id}/projects/${project_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok === true) {
        alert("SUCCESS");
      } else if (response.ok === false) {
        alert("FAILED");
      }
    });
  };

  let projects;
  if (projectsList === undefined || projectsList === null) {
    projects = (
      <div>
        <h2>Add new project</h2>
      </div>
    );
  } else {
    projects = projectsList.map((item) => (
      <div className="project">
        <span id="project_details">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
        </span>
  
        <span id="project-options">
          <h4 
          onClick={(e)=>{
            e.target.parentNode.parentNode.remove()
            handleDeletingProject(item.id)
          }}
            className="material-icons"
          >
            delete
          </h4>
        </span>
      </div>
    ));
  }

  console.log(skills);

  // add new skills
  let handleAddingSkills = (name, description) => {
    console.log(name, description);
    let newObj = {
      name,
      description,
    };

    console.log(newObj);

    fetch(`https://phase-three-sinatra-project.onrender.com/add/skill/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then((response) => {
      if (response.ok === true) {
        alert("SUCCESS");
      } else if (response.ok === false) {
        alert("FAILED");
      }
    });
  };

  let handleAddProject = () => {
    let newObj = {
      title: projectTitle,
      description: projectDescription,
      project_Github_url: projectUrl,
    };

    console.log(newObj);
    fetch(
      `https://phase-three-sinatra-project.onrender.com/add/projects/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }
    ).then((response) => {
      if (response.ok === true) {
        alert("SUCCESS");
      } else if (response.ok === false) {
        alert("FAILED");
      }
    })}

  return (
    <div id="homepage-container">
      <>
        <section id="project-body">
          <div id="userDetails">
          <h1 id="userName">
            {name}
          </h1>
          </div>
          <div id="skills-container">
            <div id="skills-box">
            <div id="my-skills">
              {skills}
             </div>
                <form id="newSkillsform">
                  <h1>
                    Add a new skill <span>.</span>
                  </h1>
                  <label>Name</label>
                  <input
                    onChange={(e) => {
                      setSkillName(e.target.value);
                    }}
                    id="skill_name"
                    type="text"
                    name="name"
                    value={skillName}
                  />
                  <label>Description</label>
                  <input
                    onChange={(e) => {
                      setSkillDescription(e.target.value);
                    }}
                    type="text"
                    id="skill_description"
                    name="description"
                    value={skillDescription}
                  />
                  <button
                    onClick={(e) => {
                      if(skillsGroup.length < 10){
                      e.preventDefault();
                      handleAddingSkills(skillName, skillDescription);
                      window.location.reload();}
                      else(
                        alert("You cannot add more skills")
                      )
                    }}
                  >
                    Add
                  </button>
                </form>
              </div>
          </div>
          <div id="projects">
            <form id="project_add_form">
            <h1>Add Project</h1>
            <label>Project Title</label>
            <input
              onChange={(e) => {
                setProjectTitle(e.target.value);
              }}
              type="text"
              value={projectTitle}
            />
            <label>Project Description</label>
            <input
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
              type="text"
              value={projectDescription}
            />
            <label>Github url</label>
            <input
              onChange={(e) => {
                setProjectUrl(e.target.value);
              }}
              type="text"
              value={projectUrl}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddProject();
                window.location.reload();
              }}
            >
              Add project
            </button>
          </form>
          <div id="userProjects">{projects}</div>
          </div>
        </section>
      </>
    </div>
  );
}

export default ProjectList;