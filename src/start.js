import {h, r} from "./lib/view.js";
import {loadEntries, groupBy} from "./config.js";
import VerticalList from "./view/VerticalList.js";

async function start() {
    const entries = await loadEntries();
    const view = h(VerticalList, {entries, groupBy});

    r(view, document.body);
}

start();
