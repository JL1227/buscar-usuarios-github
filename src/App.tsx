import { useState } from 'react'
import './App.css'
import axios from 'axios'

type GITHUBResponse = {
  name: string;
  avatar_url: string;
  bio: string;
};

function App() {

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("Aguardando...");
  const [bio, setBio] = useState("Aguardando...");
  const [avatarURL, setAvatarURL] = useState("Aguardando...");

  const handleSearch = () => {
    axios
      .get<GITHUBResponse>(`https://api.github.com/users/${userName}`)
      .then((res) => {
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className='app-title'>Buscar Usuários do GitHub</h1>
      <div className="container">
        <div className='container-busca'>
          <h3>Digite um usuário para buscar:</h3>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
          <button onClick={handleSearch}>Procurar</button>
        </div>
        <div className='container-usuario'>
          <img src={avatarURL} alt="Usuário" />
          <h1>{name}</h1>
          <p>{bio}</p>
        </div>
      </div>
    </div>
  )
}

export default App
