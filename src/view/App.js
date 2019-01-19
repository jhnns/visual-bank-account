import {LitElement, html} from "@polymer/lit-element";
import {loadEntries} from "../config.js";
import "./Group.js";
import {typoH2} from "../style/typo.js";

class App extends LitElement {
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
        this.loadEntries();
    }

    async loadEntries() {
        this.entries = await loadEntries();
    }

    render() {
        return html`
            ${typoH2}
            <x-group .entries=${this.entries}>
                <h2 slot="title">All entries</h2>
            </x-group>
        `;
    }
}

customElements.define("x-app", App);
