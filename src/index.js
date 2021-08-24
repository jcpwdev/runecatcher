
import '/node_modules/choices.js/public/assets/styles/choices.min.css';

import './styles/style.scss';

import Search from "./modules/search";

import {PD2Runes} from "./modules/runes/pd2_runes";

import PD2Runewords from "./modules/runewords/pd2_runewords";

let search = new Search(PD2Runes, PD2Runewords);

search.init();



