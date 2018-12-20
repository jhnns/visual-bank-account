// @ts-check

import {orderBy} from "./config.js";

const {li, p, ol} = H;

function Sum({label}) {
    return p(label);
}

function List({rawEntries, level = 0}) {
    const toClusters = orderBy[level];
    const clusters = toClusters(rawEntries);

    return ol(
        ...clusters.map(cluster =>
            li(
                H(Sum, {label: cluster.label}),
                ...(level < orderBy.length - 1 ? [H(List, {rawEntries: cluster.items, level: level + 1})] : [])
            )
        )
    );
}

export function renderList(rawEntries) {
    R(H(List, {rawEntries}), document.body);
}
