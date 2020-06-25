import React, { useState, useEffect }  from "react";
import api from "./services/api";



import "./styles.css";

function App() {


  const [repositories, setRepositories] = useState([]);


  useEffect(()=>{
    api.get('repositories').then( response => {
      setRepositories(response.data);
    });

  },[])

  async function handleAddRepository() {

    const response = await api.post('repositories',{
      title: `Nove Repositorio ${Date.now()}`, 
      url: "https://github.com/andreamador", 
      techs: ["as mais modernas"]
    });

    const repositore = response.data;

    setRepositories([...repositories, repositore]);
  }

  

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter( repositore => repositore.id !== id );
    
    setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repositore => {
          return ( <li key={repositore.id} > 
              {repositore.title} 
              <button onClick={() => handleRemoveRepository(repositore.id)}>
                Remover
              </button>
          </li>)
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
