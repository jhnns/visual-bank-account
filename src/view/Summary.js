import {LitElement, html} from "@polymer/lit-element";
import "./Money.js";
import {borderRegular, borderRadiusRegular, gapRegular, gapSmall} from "../style/container";

/**
 * @typedef SummarizedEntries
 * @property {number} numberOfEntries
 * @property {number} numberOfExpenses
 * @property {number} numberOfEarnings
 * @property {number} expensesSum
 * @property {number} earningsSum
 * @property {number} balance
 */

/**
 * @param {Array<import("../config.js").Entry>} entries
 * @returns {SummarizedEntries}
 */
function summarizeEntries(entries) {
    const numberOfEntries = entries.length;
    const expenses = entries.filter(entry => entry.amount <= 0);
    const earnings = entries.filter(entry => entry.amount > 0);
    const numberOfExpenses = expenses.length;
    const numberOfEarnings = earnings.length;
    const expensesSum = expenses.reduce((sum, entry) => sum - entry.amount, 0);
    const earningsSum = earnings.reduce((sum, entry) => sum + entry.amount, 0);
    const balance = entries.reduce((sum, entry) => sum + entry.amount, 0);

    return {
        numberOfEntries,
        numberOfExpenses,
        numberOfEarnings,
        expensesSum,
        earningsSum,
        balance,
    };
}

class Summary extends LitElement {
    static get properties() {
        return {
            entries: {
                type: Array,
            },
        };
    }

    constructor() {
        super();
        this.entries = [];
    }

    render() {
        const {
            numberOfEntries,
            numberOfExpenses,
            numberOfEarnings,
            expensesSum,
            earningsSum,
            balance,
        } = summarizeEntries(this.entries);

        return html`
            <style>
                .card-group {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    color: rgb(14, 110, 142);
                    background-color: rgba(14, 110, 142, 0.09);
                }

                .card-group:not(:last-child) {
                    margin-bottom: ${gapRegular};
                }

                .card-group > * {
                    display: grid;
                    grid-template-rows: auto auto;
                    grid-template-columns: auto;
                    grid-gap: ${gapSmall};
                    border: ${borderRegular};
                    border-color: currentColor;
                    padding: ${gapRegular};
                }

                .card-group > :not(:first-child) {
                    border-top: none;
                }

                .card-group > :first-child {
                    border-top: ${borderRegular};
                    border-color: currentColor;
                    border-top-left-radius: ${borderRadiusRegular};
                    border-top-right-radius: ${borderRadiusRegular};
                }

                .card-group > :last-child {
                    border-bottom-left-radius: ${borderRadiusRegular};
                    border-bottom-right-radius: ${borderRadiusRegular};
                }

                .amount {
                    font-size: 1.3em;
                    line-height: 1;
                }
            </style>
            <ul class="card-group">
                <li>
                    <span class="description"> Expenses sum </span>
                    <span class="amount"> <x-money amount=${expensesSum} currency="EUR"></x-money> </span>
                </li>
                <li>
                    <span class="description"> Earnings sum </span>
                    <span class="amount"> <x-money amount=${earningsSum} currency="EUR"></x-money> </span>
                </li>
                <li>
                    <span class="description"> Balance </span>
                    <span class="amount"> <x-money amount=${balance} currency="EUR"></x-money> </span>
                </li>
            </ul>
            <ul class="card-group">
                <li><span class="description"> Entries </span> <span class="amount"> ${numberOfEntries} </span></li>
                <li><span class="description"> Expenses </span> <span class="amount"> ${numberOfExpenses} </span></li>
                <li><span class="description"> Earnings </span> <span class="amount"> ${numberOfEarnings} </span></li>
            </ul>
        `;
    }
}

customElements.define("x-summary", Summary);
