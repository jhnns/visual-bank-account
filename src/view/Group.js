import {LitElement, html} from "@polymer/lit-element";
import {borderRegular, gapRegular} from "../style/container.js";
import {groups} from "../config.js";
import "./Summary.js";
import {typoH2} from "../style/typo.js";

const SUB_GROUP_NONE = "none";

class Group extends LitElement {
    static get properties() {
        return {
            entries: {
                type: Array,
            },
            subGroups: {
                type: Array,
            },
        };
    }

    constructor() {
        super();
        this.handleGroupByChange = this.handleGroupByChange.bind(this);
        this.entries = undefined;
        this.subGroups = undefined;
    }

    render() {
        const subGroupOptions = Object.keys(groups).map(
            group => html`<option>${group}</option>`
        );
        const subGroups =
            this.subGroups === undefined ?
                "" :
                this.subGroups.map(
                    subGroup => html`<x-group .entries=${subGroup.entries}> <h2 slot="title">${subGroup.label}</h2> </x-group>`
                );

        return html`
            ${typoH2}
            <style>
                .group {
                    display: grid;
                    grid-template-rows: auto auto;
                    grid-template-columns: auto 1fr;
                    grid-gap: ${gapRegular};
                    padding: ${gapRegular};
                }

                .title {
                    padding-bottom: ${gapRegular};
                    border-bottom: ${borderRegular};
                    grid-column: span 2;
                }
            </style>
            <div class="group">
                <div class="title"><slot name="title"></slot></div>
                <div class="summary"><x-summary .entries=${this.entries}></x-summary></div>
                <div>
                    <form class="controls">
                        <label>
                            Group by
                            <select @change=${this.handleGroupByChange}>
                                <option default>${SUB_GROUP_NONE}</option>
                                ${subGroupOptions}
                            </select>
                        </label>
                    </form>
                    ${subGroups}
                </div>
            </div>
        `;
    }

    /**
     * @param {Event} event
     */
    handleGroupByChange(event) {
        const groupBy = event.currentTarget.value;

        this.subGroups = groupBy === SUB_GROUP_NONE ? undefined : groups[groupBy](this.entries);
    }
}

customElements.define("x-group", Group);
