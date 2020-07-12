import LoL from "../resources/games/lol.png";
import Dota from "../resources/games/dota2.png";
import CSGO from "../resources/games/csgo.png";
import Search from "../resources/suche.svg";

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
        default:
            return Search;
            break;
    }
}
