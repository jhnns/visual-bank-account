// @ts-check

import {loadRawEntries} from "./config.js";
import {renderList} from "./render.js";

async function start() {
    const rawEntries = await loadRawEntries();

    renderList(rawEntries);
}

start();
