import React from 'react';

/**
 * @return {number}
 */
function CurrencyResult(props) {
    const result = props.amount * props.rate;
    return <p>{result}</p>
    }

export default CurrencyResult;