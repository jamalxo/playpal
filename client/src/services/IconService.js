import LoL from "../resources/GameLogos/lol.png";
import Dota from "../resources/GameLogos/dota2.png";
import CSGO from "../resources/GameLogos/csgo.png";
import Overwatch from "../resources/GameLogos/overwatch.webp";
import Valorant from "../resources/GameLogos/valorant.png";
import Pubg from "../resources/GameLogos/pubg.png";
import Cod from "../resources/GameLogos/cod.png";
import Wow from "../resources/GameLogos/wow.png";
import Hots from "../resources/GameLogos/hots.jpg";
import Search from "../resources/HomePageIcons/suche.svg";

export function getGameIcon(game) {
    switch (game) {
        case 'LoL':
            return LoL;
            break;
        case 'DotA 2':
            return Dota;
            break;
        case 'CS:GO':
            return CSGO;
            break;
        case 'Overwatch':
            return Overwatch;
            break;
        case 'Valorant':
            return Valorant;
            break;
        case 'PUBG':
            return Pubg;
            break;
        case 'CoD':
            return Cod;
            break;
        case 'WoW':
            return Wow;
            break;
        case 'HotS':
            return Hots;
            break;
        default:
            return Search;
            break;
    }
}
