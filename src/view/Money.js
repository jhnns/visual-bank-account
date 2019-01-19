import {LitElement, html} from "@polymer/lit-element";

const numberFormat = new Intl.NumberFormat();

/**
 * @typedef FormatAmount
 * @property {string} major
 * @property {string} minor
 */

/**
 * @param {number} amount
 * @returns {FormatAmount}
 */
function formatAmount(amount) {
    const major = Math.sign(amount) * Math.floor(Math.abs(amount) / 100);
    const minor = Math.abs(amount % 100);

    return {
        major: Number.isNaN(major) ? "--" : numberFormat.format(major),
        minor: Number.isNaN(minor) ? "--" : minor.toString().padStart(2, "0"),
    };
}

class Money extends LitElement {
    static get properties() {
        return {
            amount: {
                type: Number,
            },
            currency: {
                type: String,
            },
        };
    }

    constructor() {
        super();
        this.amount = 0;
        this.currency = "";
    }

    render() {
        const {
            major,
            minor,
        } = formatAmount(this.amount);

        return html`
            <style>
                .grid {
                    display: grid;
                    grid-template-columns: auto auto;
                    grid-gap: 0.2em;
                    justify-content: flex-start;
                }

                .major {
                    font-size: 1em;
                    line-height: 1em;
                    grid-row: 1 / 3;
                    grid-column: 1 / 2;
                }

                .minor {
                    position: relative;
                    top: 0.2em;
                    font-size: 0.4em;
                    line-height: 1em;
                    grid-row: 1 / 2;
                    grid-column: 2 / 3;
                }

                .currency {
                    position: relative;
                    bottom: 0.1em;
                    font-size: 0.4em;
                    line-height: 1em;
                    grid-row: 2 / 3;
                    grid-column: 2 / 3;
                }
            </style>
            <span class="grid">
                <span class="major">${major}</span>
                <span class="minor">${minor}</span>
                <span class="currency">${this.currency}</span>
            </span>
        `;
    }
}

customElements.define("x-money", Money);
