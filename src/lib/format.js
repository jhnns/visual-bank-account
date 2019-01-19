export function formatCurrency(value, currency) {
    const currencyFormat = new Intl.NumberFormat(undefined, {style: "currency", currency});

    return currencyFormat.format(value);
}
