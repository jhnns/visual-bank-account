// @ts-check

import {loadEntries} from "./config.js";
import {renderList} from "./render.js";

async function start() {
    const rawEntries = await loadEntries();

    renderList(rawEntries);
}

start();
