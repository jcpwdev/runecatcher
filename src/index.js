
import '/node_modules/choices.js/public/assets/styles/choices.min.css';

import './styles/style.scss';

import Search from "./modules/search";

import {ClassicRunes} from "./modules/runes/classic_runes";

import ClassicRunewords from "./modules/runewords/classic_runewords";

let search = new Search(ClassicRunes, ClassicRunewords);

search.init();



