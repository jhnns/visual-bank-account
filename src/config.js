/**
 * @typedef {object} Entry
 * @prop {string} id - a serializable id
 * @prop {string} originId - a unique identifier for the origin account of that entry
 * @prop {string} date - as ISO string
 * @prop {number} amount - positive numbers for earnings, negative for spendings
 * @prop {string} oppositeId
 * @prop {string} oppositeName
 * @prop {string} description
 * @prop {object} raw - a reference to the original entry object
 */

/**
 * @typedef {function(): Promise<Array<Entry>>} LoadEntries
 */

export {groups, loadEntries} from "../private/config.js";
