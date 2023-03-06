import { useEffect, useState } from "react";


function ProjectList({ myEmail }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // skill input value
  let [skillName, setSkillName] = useState("");
  let [skillDescription, setSkillDescription] = useState("");

  // projects values
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectUrl, setProjectUrl] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`/user/${myEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data["skills"]);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
  }, [myEmail]);

  // user details
  let name = data["first_name"] + " " + data["last_name"];
  let bio = data["bio"];
  let email = data["email"];
  let career = data["career"];
  let skillsList = data["skills"];
  let projectsList = data["projects"];
  let id = data["id"];

  console.log(id);

  console.log(skillsList);

  let handleUpdating = (name, description, skill_id) => {
    let newObj = {
      name,
      description,
    };

    console.log(newObj);
    fetch(`https://phase-three-sinatra-project.onrender.com/skills/${id}/${skill_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
      .then((response) => response.json())
      .then((data) => {
        // handle success response
        console.log(data);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  // deleting skills
  let handleDeletingSkills = (skill_id) => {
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
  if (skillsList === undefined || skillsList === null) {
    skills = (
      <div
        onClick={() => {
          document.querySelector("#skills-form").style.zIndex = 9999;
        }}
        className="s-add"
      >
        <i className="material-icons">add</i>
        <h2>Add new skill</h2>
      </div>
    );
  } else {
    skills = skillsList.map((item) => (
      <div className="skill">
        <span id="skill-emojis">
          <i
            onClick={(e) => {
              e.target.parentElement.nextElementSibling.style.visibility =
                "visible";
            }}
            className="material-icons"
          >
            more_vert
          </i>
        </span>
        <span className="skills-menu">
          <h6
            onClick={(e) => {
              e.target.parentNode.style.visibility = "hidden";
              let children =
                e.target.parentElement.nextElementSibling.childNodes;
              e.target.parentElement.nextElementSibling.nextElementSibling.style.visibility =
                "visible";
              children.forEach((child) => {
                // Do something with the child node, such as toggle its class
                child.contentEditable = true;
                child.style.border = "1px solid grey";
              });
            }}
          >
            edit
          </h6>
          <h6
            onClick={(e) => {
              e.target.parentNode.parentNode.remove();
              handleDeletingSkills(item.id);
            }}
          >
            delete
          </h6>
        </span>
        <span id="skill-details-span">
          <h3 id="skill_name" spellCheck="false">
            {item.name}
          </h3>
          <h5 id="skill_description" spellCheck="false">
            {item.description}
          </h5>
        </span>
        <i
          onClick={(e) => {
            e.target.style.visibility = "hidden";
            let value = [];
            let children = e.target.previousElementSibling.childNodes;
            let name =
              e.target.previousElementSibling.querySelector(
                ":first-child"
              ).textContent;
            let description =
              e.target.previousElementSibling.querySelector(
                ":last-child"
              ).textContent;
            handleUpdating(name, description, item.id);
            children.forEach((child) => {
              child.contentEditable = false;
              child.style.border = "1px solid transparent";
            });
          }}
          id="saveIcon"
          className="material-icons"
        >
          done
        </i>
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

  let handleUpdatingProject = (title, description, desc_id) => {
    let newObj = {
      title,
      description,
    };
    console.log(newObj, desc_id);
    fetch(
      `https://phase-three-sinatra-project.onrender.com/users/${id}/projects/${desc_id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }
    )
      .then((data) => {
        // handle success response
        console.log(data);
      })
      .catch((error) => {
        // handle error response
        console.log(error);
      });
  };

  let projects;
  if (projectsList === undefined || projectsList === null) {
    projects = (
      <div
        onClick={() => {
          document.querySelector("#projects-form").style.zIndex = 9999;
        }}
        className="p-alert"
      >
        <i className="material-icons">add</i>
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
        <span>
          <form id="newDetailsForm">
            <label>New name:</label>
            <input id="newTitle" type="text" />
            <label>New Description:</label>
            <input id="newDesc" type="text" />
          </form>
        </span>
        <i className="fa fa-github"></i>
        <span id="project-options">
          <i
            onClick={(e) => {
              let projectTitle = document.querySelector("#newTitle").value;
              let projectDescription = document.querySelector("#newDesc").value;

              console.log(projectTitle, projectDescription);
              if (e.target.textContent === "edit") {
                e.target.innerHTML = "";
                e.target.textContent = "done";
                document.getElementById("newDetailsForm").style.visibility =
                  "visible";
              } else if (e.target.textContent === "done") {
                e.target.innerHTML = "";
                e.target.textContent = "edit";
                document.getElementById("newDetailsForm").style.visibility =
                  "hidden";
                if (projectTitle !== "") {
                  let title =
                    (e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.childNodes[0].innerHTML =
                      projectTitle);
                }
                if (projectDescription !== "") {
                  let description =
                    (e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.childNodes[1].innerHTML =
                      projectDescription);
                }
                if (projectDescription === "") {
                  projectDescription =
                    e.target.parentElement.previousElementSibling
                      .previousElementSibling.previousElementSibling
                      .childNodes[1].textContent;
                }
                if (projectTitle === "") {
                  projectTitle =
                    e.target.parentElement.previousElementSibling
                      .previousElementSibling.previousElementSibling
                      .childNodes[0].textContent;
                }
                handleUpdatingProject(
                  projectTitle,
                  projectDescription,
                  item.id
                );
                document.getElementById("newDetailsForm").reset();
              }
            }}
            className="material-icons"
          >
            edit
          </i>
          <i
            onClick={(e) => {
              e.target.parentNode.parentNode.remove();
              handleDeletingProject(item.id);
            }}
            className="material-icons"
          >
            delete
          </i>
        </span>
      </div>
    ));
  }

  console.log(skills);

  // menu icon state
  let [isMenuVisible, setMenuVisible] = useState(false);

  let menuIcon = isMenuVisible ? "close" : "menu";

  // toggle menu visibilty
  function toggleMenu() {
    document.getElementById("menu").classList.toggle("active-menu");
    if (isMenuVisible) {
      setMenuVisible(false);
    } else {
      setMenuVisible(true);
    }
  }

  // add new skills
  let handleAddingSkills = (name, description) => {
    console.log(name, description);
    // setIsLoading(false)
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
      if(response.ok === true) {
        setIsLoading(true)
        alert('SUCCESS')
      }else if(response.ok === false) {
        // setIsLoading(true)
        alert('FAILED')
      }
    });
  };

  let handleAddProject = () => {
    // console.log(name, description);

    let newObj = {
      title: projectTitle,
      description: projectDescription,
      project_Github_url: projectUrl,
    };

    console.log(newObj);
    fetch(`https://phase-three-sinatra-project.onrender.com/add/projects/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div id="homepage-container">
    
        <>
          <section id="project-body">
            <h1 id="user-name">
              {name}
              <span>.</span>
            </h1>
            <div id="introduction">
              <h3>INTRODUCTION</h3>
              <h2>{career}</h2>
              <p>{bio}</p>
            </div>
            <div id="skills-container">
              <span id="pre-skills"></span>
              <div id="skills-box">
                <h2>SKILLS</h2>
                <div id="my-skills">
                  {skills}
                  <div
                    onClick={() => {
                      document.querySelector(
                        "#skills-form"
                      ).style.zIndex = 9999;
                    }}
                    className="s-add"
                  >
                    <i className="material-icons">add</i>
                    <h2>Add new skill</h2>
                  </div>
                </div>
              </div>
            </div>
            <div id="projects">
              <h2>PROJECTS</h2>
              <div id="my-projects">
                {projects}
                <div
                  onClick={() => {
                    document.querySelector(
                      "#projects-form"
                    ).style.zIndex = 9999;
                  }}
                  className="p-alert"
                >
                  <i className="material-icons">add</i>
                  <h2>Add new project</h2>
                </div>
              </div>
            </div>
        
            <footer></footer>
          </section>
          <section id="skills-form">
            <form id="add_skills_form">
              <i
                onClick={(e) => {
                  e.target.parentElement.parentElement.style.zIndex = -3;
                }}
                id="closeFormIcon"
                className="material-icons"
              >
                close
              </i>
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
                  e.preventDefault();
                  handleAddingSkills(skillName, skillDescription);
                  // e.target.parentElement.parentElement.style.zIndex = -3;
                  window.location.reload();
                }}
              >
                Add<i className="material-icons">arrow_forward</i>
              </button>
            </form>
          </section>
          <section id="projects-form">
            <form>
              <i
                onClick={(e) => {
                  e.target.parentElement.parentElement.style.zIndex = -3;
                }}
                id="closeFormIcon"
                className="material-icons"
              >
                close
              </i>
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
                  // e.target.parentElement.parentElement.style.zIndex = -3;
                  handleAddProject();
                  window.location.reload();
                }}
              >
                Add project<i className="material-icons">arrow_forward</i>
              </button>
            </form>
          </section>
        </>
 
    </div>
  );
}

export default ProjectList;