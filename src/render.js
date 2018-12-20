// @ts-check

import {groupBy} from "./config.js";

const {li, p, ol} = H;

function Sum({label}) {
    return p(label);
}

function List({entries, level = 0}) {
    const toGroups = groupBy[level];
    const groups = toGroups(entries);

    return ol(
        ...groups.map(group =>
            li(
                H(Sum, {label: group.label}),
                ...(level < groupBy.length - 1 ? [H(List, {entries: group.entries, level: level + 1})] : [])
            )
        )
    );
}

export function renderList(entries) {
    R(H(List, {entries}), document.body);
}
