// @ts-check

/**
 * @typedef {object} Group
 * @prop {string} id
 * @prop {string} label
 * @prop {Array<import("./config.js").Entry>} entries
 */

/**
 * @typedef {function(Array<import("./config.js").Entry>): Array<Group>} ToGroups
 */

/**
 * @type {ToGroups}
 */
export function byYear(entries) {
    /** @type {Map<string, Group>} */
    const groups = new Map();

    entries.forEach(entry => {
        const year = new Date(entry.date).getFullYear()
            .toString();

        if (groups.has(year) === false) {
            groups.set(year, {
                id: year,
                label: year,
                entries: [],
            });
        }

        const group = groups.get(year);

        group.entries.push(entry);
    });

    return Array.from(groups.values());
}

/**
 * @type {ToGroups}
 */
export function byAmountSign(entries) {
    /** @type {Map<string, Group>} */
    const groups = new Map();

    entries.forEach(entry => {
        const sign = Math.sign(entry.amount);
        const id = sign === 1 ? "earnings" : sign === -1 || sign === 0 ? "spendings" : "others";

        if (groups.has(id) === false) {
            const label = id.slice(0, 1).toUpperCase() + id.slice(1);

            groups.set(id, {
                id,
                label,
                entries: [],
            });
        }

        const group = groups.get(id);

        group.entries.push(entry);
    });

    return Array.from(groups.values());
}

/**
 * @type {ToGroups}
 */
export function byDescription(entries) {
    /** @type {Map<string, Group>} */
    const groups = new Map();

    entries.forEach(entry => {
        const description = entry.description;

        if (groups.has(description) === false) {
            groups.set(description, {
                id: description,
                label: description,
                entries: [],
            });
        }

        const group = groups.get(description);

        group.entries.push(entry);
    });

    return Array.from(groups.values());
}

/**
 * @type {ToGroups}
 */
export function byOppositeId(entries) {
    /** @type {Map<string, Group>} */
    const groups = new Map();

    entries.forEach(entry => {
        const oppositeId = entry.oppositeId;

        if (groups.has(oppositeId) === false) {
            groups.set(oppositeId, {
                id: oppositeId,
                label: entry.oppositeName,
                entries: [],
            });
        }

        const group = groups.get(oppositeId);

        group.entries.push(entry);
    });

    return Array.from(groups.values());
}
