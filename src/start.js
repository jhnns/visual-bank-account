// @ts-check

import {loadEntries, groupBy} from "./config.js";
import VerticalList from "./view/VerticalList.js";

async function start() {
    const entries = await loadEntries();
    const view = H(VerticalList, {entries, groupBy});

    R(view, document.body);
}

start();
