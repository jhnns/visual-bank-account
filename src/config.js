// @ts-check

/**
 * @typedef {object} Entry
 * @prop {string} id - a serializable id
 * @prop {string} date - as ISO string
 * @prop {number} amount - positive numbers for earnings, negative for spendings
 * @prop {string} oppositeId
 * @prop {string} oppositeName
 * @prop {string} description
 */

/**
 * @typedef {object} RawEntry
 */

/**
 * @typedef {function(): Promise<RawEntry>} LoadRawEntries
 */

/**
 * @typedef {function(RawEntry): Entry} ToEntry
 */

export {orderBy, loadRawEntries, toEntry} from "../data/config.js";
