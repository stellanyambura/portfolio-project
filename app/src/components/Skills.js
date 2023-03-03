import React, { useState, useEffect } from 'react';

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('https://phase-three-sinatra-project.onrender.com/api/skills')
      .then(response => response.json())
      .then(data => setSkills(data));
  }, []);

  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>
            <h2>{skill.name}</h2>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Skills;
