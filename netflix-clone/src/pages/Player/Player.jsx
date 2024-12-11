// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams();

  const [apiData, setApiData] = useState({
    name:"",
    key: "",
    published_at: "",
    typeof: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDUwYWIwZmVmODAxNjE4M2UyZTVhM2ViMTczMTMxMCIsIm5iZiI6MTczMzY1NzE1MC41MjE5OTk4LCJzdWIiOiI2NzU1ODIzZTQzMTEwOGFhMjNkMTA2MTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mmcfIq0HQAmOOFDvMCbezOKSfwcgbnDqf-7CE2JyTlg'
    }
  };

  useEffect (() => {
    
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
    
  },[])


  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.Name}</p>
        <p>{apiData.Type}</p>
      </div>
    </div>
  );
};

export default Player;
