import './App.css'
import axios from 'axios'
import { useState } from 'react'
import { FaUser, FaBuilding } from 'react-icons/fa';
import { RiGitRepositoryFill } from 'react-icons/ri';
import { IoLocationSharp } from 'react-icons/io5';

type GitHubUser = {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  followers: number
  following: number
  company: string
  location: string
};

function App() {

  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("Usuário");
  const [bio, setBio] = useState<string>("Bio do Usuário");
  const [avatarURL, setAvatarURL] = useState<string>("./assets/git.png");
  const [login, setLogin] = useState<string>("Login do Usuário")
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [company, setCompany] = useState<string>("Companhia do Usuário")
  const [location, setLocation] = useState<string>("Localização do Usuário")

  const handleSearchUser = () => {
    axios
      .get<GitHubUser>(`https://api.github.com/users/${userName}`)
      .then((res) => {
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
        setLogin(res.data.login);
        setFollowers(res.data.followers)
        setFollowing(res.data.following)
        setCompany(res.data.company)
        setLocation(res.data.location)
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
          <button onClick={handleSearchUser}>Procurar</button>
        </div>
        <div className='container-usuario'>
          <img src={avatarURL} alt="Usuário" />
          <h1>{name}</h1>
          <p>{login}</p>
          <p className='bio-usuário'>{bio}</p>
          <p className='followers-following'><FaUser /> Seguidores: {followers} · Seguindo: {following}</p>
          <p className='companhia-usuário'><FaBuilding /> {company}</p>
          <p className='localização-usuário'><IoLocationSharp /> {location}</p>
          <p className='repositório-usuário'>
            <a target="_blank" href={`https://github.com/${userName}?tab=repositories`}>
              <RiGitRepositoryFill /> Link do repositório do Usuário
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
