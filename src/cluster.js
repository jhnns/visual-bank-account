// @ts-check

import {toEntry} from "./config.js";

/**
 * @typedef {object} Cluster
 * @prop {string} id
 * @prop {string} label
 * @prop {Array<import("./config.js").RawEntry>} items
 */

/**
 * @typedef {function(Array<import("./config.js").RawEntry>): Array<Cluster>} ToCluster
 */

/**
 * @type {ToCluster}
 */
export function byYear(rawEntries) {
    /** @type {Map<string, Cluster>} */
    const clusters = new Map();

    rawEntries.forEach(rawEntry => {
        const entry = toEntry(rawEntry);
        const year = new Date(entry.date).getFullYear()
            .toString();

        if (clusters.has(year) === false) {
            clusters.set(year, {
                id: year,
                label: year,
                items: [],
            });
        }

        const cluster = clusters.get(year);

        cluster.items.push(rawEntry);
    });

    return Array.from(clusters.values());
}

/**
 * @type {ToCluster}
 */
export function byAmountSign(rawEntries) {
    /** @type {Map<string, Cluster>} */
    const clusters = new Map();

    rawEntries.forEach(rawEntry => {
        const entry = toEntry(rawEntry);
        const sign = Math.sign(entry.amount);
        const id = sign === 1 ? "earnings" : sign === -1 || sign === 0 ? "spendings" : "others";

        if (clusters.has(id) === false) {
            const label = id.slice(0, 1).toUpperCase() + id.slice(1);

            clusters.set(id, {
                id,
                label,
                items: [],
            });
        }

        const cluster = clusters.get(id);

        cluster.items.push(rawEntry);
    });

    return Array.from(clusters.values());
}

/**
 * @type {ToCluster}
 */
export function byDescription(rawEntries) {
    /** @type {Map<string, Cluster>} */
    const clusters = new Map();

    rawEntries.forEach(rawEntry => {
        const entry = toEntry(rawEntry);
        const description = entry.description;

        if (clusters.has(description) === false) {
            clusters.set(description, {
                id: description,
                label: description,
                items: [],
            });
        }

        const cluster = clusters.get(description);

        cluster.items.push(rawEntry);
    });

    return Array.from(clusters.values());
}

/**
 * @type {ToCluster}
 */
export function byOppositeId(rawEntries) {
    /** @type {Map<string, Cluster>} */
    const clusters = new Map();

    rawEntries.forEach(rawEntry => {
        const entry = toEntry(rawEntry);
        const oppositeId = entry.oppositeId;

        if (clusters.has(oppositeId) === false) {
            clusters.set(oppositeId, {
                id: oppositeId,
                label: entry.oppositeName,
                items: [],
            });
        }

        const cluster = clusters.get(oppositeId);

        cluster.items.push(rawEntry);
    });

    return Array.from(clusters.values());
}
