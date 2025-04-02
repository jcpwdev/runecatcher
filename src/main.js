
import "choices.js/public/assets/styles/choices.css";

import './styles/style.scss';

import Search from "./modules/search.js";

import {ClassicRunes} from "./modules/runes/classic_runes.js";

import ClassicRunewords from "./modules/runewords/classic_runewords.js";

let search = new Search(ClassicRunes, ClassicRunewords);

search.init();



