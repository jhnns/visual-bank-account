import {h} from "../lib/view.js";

const {div} = h;

export default function Entry({date, oppositeName, description, amount, currency}) {
    const currencyFormat = new Intl.NumberFormat(undefined, {style: "currency", currency});

    return div(date, "\t", oppositeName, "\t", description, "\t", currencyFormat.format(amount / 100));
}
