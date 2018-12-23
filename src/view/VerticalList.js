import {h} from "../lib/view.js";
import Entry from "./Entry.js";

const {li, p, ol} = h;

export default function VerticalList({entries, groupBy, level = 0}) {
    if (level < groupBy.length) {
        const toGroups = groupBy[level];
        const groups = toGroups(entries);

        return ol(
            ...groups.map(group =>
                li(p(group.label), h(VerticalList, {entries: group.entries, groupBy, level: level + 1}))
            )
        );
    }

    return ol(...entries.map(entry => h(Entry, entry)));
}
