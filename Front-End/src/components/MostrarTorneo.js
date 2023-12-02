import React from "react";

import "../statics/css/General.css";
import "../statics/css/VerTorneos.css";

function MostrarTorneo(props) {

  function mostrar() {
    
    const torneoImg = {
      COD: require("../statics/videogames/callOfDuty.png"),
      "CS:GO": require("../statics/videogames/csgo.png"),
      "Dota 2": require("../statics/videogames/dota2.png"),
      "Fall Guys": require("../statics/videogames/fallguys.png"),
      Fortnite: require("../statics/videogames/fortnite.png"),
      HearthStone: require("../statics/videogames/hearthstone.png"),
      "League of Legends": require("../statics/videogames/lol.png"),
      "Legends of Runeterra": require("../statics/videogames/lor.png"),
      "Mario Kart": require("../statics/videogames/mariokart.png"),
      Minecraft: require("../statics/videogames/minecraft.png"),
      "Mortal Kombat": require("../statics/videogames/mortalkombat.png"),
      "Rocket League": require("../statics/videogames/rocketleague.png"),
      "Smash Bros": require("../statics/videogames/smashbros.png"),
      "StarCraft II": require("../statics/videogames/starcraft2.png"),
      Valorant: require("../statics/videogames/valorant.png"),
    };

    return torneoImg[props.videojuego];
  }

  return <img class="tournament-img" src={ mostrar() } alt={props.videojuego}/>;
}

export default MostrarTorneo;