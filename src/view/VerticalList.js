import Entry from "./Entry.js";

const {li, p, ol} = H;

export default function VerticalList({entries, groupBy, level = 0}) {
    if (level < groupBy.length) {
        const toGroups = groupBy[level];
        const groups = toGroups(entries);

        return ol(
            ...groups.map(group =>
                li(p(group.label), H(VerticalList, {entries: group.entries, groupBy, level: level + 1}))
            )
        );
    }

    return ol(...entries.map(entry => H(Entry, entry)));
}
