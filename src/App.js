import React, { useState, useEffect } from "react";
import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
    })
  })

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Desafio React projeto ${Date.now()}`,
      url: "http://github.com/...",
      techs: ["tech1", "tech2"]
    })
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    let newRepos = [...repositories];
    newRepos.splice(repoIndex, 1);
    setRepositories(newRepos);
  }

  return (
    <div>
      <h1>My Repo list 🚀 </h1>
      <br/>
      <hr/>
      <ul data-testid="repository-list">
        {repositories.map(project => (
          <li key={project.id} >{project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
