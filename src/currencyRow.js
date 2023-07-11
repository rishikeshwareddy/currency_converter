import React from 'react'

export default function currencyRow(props) {
  const{currencyOptions,selectCurrency,onChangeCurrency,amount,onChangeAmount}=props
  return (
    <div>
      <input type="text" className='input' value={amount} onChange={onChangeAmount}/>
      <select value={selectCurrency} onChange={onChangeCurrency} className='selectthis'>
        {currencyOptions.map(options=>(
          <option key={options} value={options}>{options}</option>
        ))}
      </select>
    </div>
  )
}
