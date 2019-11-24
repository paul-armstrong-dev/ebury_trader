import React from 'react';

/**
 *
 * TODO: add the below to cleaning function
 * const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
 * @return {number}
 */
function CurrencyResult(props) {
    const result = props.amount * props.rate;
    return <p>{result}</p>
    }

export default CurrencyResult;