import { useEffect, useState } from "react";
//import "../styles/project.css";

function Project({ myEmail }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // skill input value
  let[skillName, setSkillName] = useState('');
  let[skillDescription, setSkillDescription] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://phase-three-sinatra-project.onrender.com/user/${myEmail}`)
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
  let career = data["career"];
  let skillsList = data["skills"];
  let projectsList = data["projects"];
  let id = data["id"];

  console.log(id)

  console.log(skillsList);


  let handleUpdating =(name, description, skill_id)=>{
    let newObj = {
    name,
    description
    }

    console.log(newObj);
    fetch(`https://phase-three-sinatra-project.onrender.com/skills/${id}/${skill_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    })
    .then(response => response.json())
    .then(data => {
      // handle success response
      console.log(data)
    })
    .catch(error => {
      // handle error response
      console.log(error);
    });
  }

// deleting skills
let handleDeletingSkills = (skill_id) => {
  fetch(`https://phase-three-sinatra-project.onrender.com/destroy/skills/${id}/${skill_id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
}

  let skills;
  if (skillsList === undefined || skillsList === null) {
    skills = <p>No skills available</p>;
  } else {
    skills = skillsList.map((item) => (
      <div className="skill">
        <span id="skill-emojis">
          <i onClick={(e)=>{
            e.target.parentElement.nextElementSibling.style.visibility = 'visible';
          }} className="material-icons">more_vert</i>
        </span>
        <span className="skills-menu">
          <h6 onClick={(e)=>{
            e.target.parentNode.style.visibility = 'hidden';
           let children = e.target.parentElement.nextElementSibling.childNodes;
           e.target.parentElement.nextElementSibling.nextElementSibling.style.visibility = 'visible';
           children.forEach((child) => {
            // Do something with the child node, such as toggle its class
            child.contentEditable = true
            child.style.border = "1px solid grey";
          });
        
          }}>edit</h6>
          <h6 onClick={(e)=>{
            e.target.parentNode.parentNode.remove()
            handleDeletingSkills(item.id)
          }}>delete</h6>
        </span>
        <span id="skill-details-span">
        <h3 id="skill_name" spellCheck="false">{item.name}</h3>
        <h5 id="skill_description" spellCheck="false">{item.description}</h5>
        </span>
        <i onClick={(e)=>{
          e.target.style.visibility = "hidden"
          let value = []
          let children = e.target.previousElementSibling.childNodes;
          let name = e.target.previousElementSibling.querySelector(':first-child').textContent;
          let description = e.target.previousElementSibling.querySelector(':last-child').textContent;
          handleUpdating(name, description, item.id)
          children.forEach((child) => {
            child.contentEditable = false
            child.style.border = "1px solid transparent";
          })
          }} id="saveIcon" className="material-icons">done</i>
      </div>
    ));
  }

  let projects;
  if (projectsList === undefined || projectsList === null) {
    projects = <p>No projects available</p>;
  } else {
    projects = projectsList.map((item) => (
      <div className="project">
        <h6>{item.name}</h6>
        <h6>{item.description}</h6>
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
let handleAddingSkills = (name,description)=>{
console.log(name,description);
 
let newObj = {
  name,
  description
}
  fetch(`https://phase-three-sinatra-project.onrender.com/add/skill/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj),
  }).then((response) => {
    console.log(response);
  });
}



  return (
    <div id="homepage-container">
      <header id="header-projects">
        <h2>
          Folio<span>flow</span>.
        </h2>
        <span id="links">
          <a href="#">PROJECTS</a>
          <a href="#pre-skills">SKILLS</a>
          <a href="#">ABOUT ME</a>
          <a href="#">CONTACTS</a>
          <i
            onClick={() => {
              toggleMenu();
            }}
            className="material-icons"
          >
            {menuIcon}
          </i>
        </span>
        <div className="inactive-menu" id="menu">
          <div id="profile-section">
            <div id="profile-pic"></div>
            {/* <span><i className="material-symbols-outlined">person</i><h5>Jeff Maina</h5></span>
                   <span><i className="material-symbols-outlined">mail</i><h5>Jeff@gmail.com</h5></span> */}
          </div>
          <span 
          onClick={()=>{
            toggleMenu()
            document.querySelector("#skills-form").style.zIndex = 9999;
          }}
          >
            <i className="material-symbols-outlined">new_label</i>
            <h4>Add skill</h4>
            <i id="menu-arrow" className="material-symbols-outlined">
              arrow_forward
            </i>
          </span>
          <span>
            <i className="material-symbols-outlined">add</i>
            <h4>Add Project</h4>
            <i id="menu-arrow" className="material-symbols-outlined">
              arrow_forward
            </i>
          </span>
          <span>
            <i className="material-symbols-outlined">logout</i>
            <h4>Log out</h4>
            <i id="menu-arrow" className="material-symbols-outlined">
              arrow_forward
            </i>
          </span>
        </div>
      </header>
      {isLoading && (
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
                {/* <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div>
                <div className="skill"></div> */}
              </div>
            </div>
          </div>
          <div id="projects">
            <h2>PROJECTS</h2>
            <div id="my-projects">
              {projects}
              {/* <div className="project"></div>
              <div className="project"></div>
              <div className="project"></div>
              <div className="project"></div>
              <div className="project"></div>
              <div className="project"></div> */}
            </div>
          </div>
          <div id="contacts">
            <h2>CONTACT ME</h2>
            <div>
              <p>
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
                lorem ipsum dolor sit amet, consect id adip nonum soc sapiente
              </p>
            </div>
          </div>
        </section>
        <section id="skills-form">
          <form id="add_skills_form">
            <i
            onClick={(e)=>{
              e.target.parentElement.parentElement.style.zIndex = -3;
            }}
             id="closeFormIcon" className="material-icons">close</i>
             <h1>Add a new skill <span>.</span></h1>
            <label>Name</label>
            <input onChange={(e)=>{setSkillName(e.target.value)}} id="skill_name" type="text" name="name" value={skillName}/>
            <label>Description</label>
            <input onChange={(e)=>{setSkillDescription(e.target.value)}} type="text" id="skill_description" name="description" value={skillDescription}/>
            <button onClick={(e)=>{
              handleAddingSkills(skillName,skillDescription)
              e.target.parentElement.parentElement.style.zIndex = -3;
            }} >Add<i className="material-icons">arrow_forward</i></button>
          </form>
        </section>
        </>
      )}
      {isLoading || (
        <div className="project-loader">
          <div class="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;