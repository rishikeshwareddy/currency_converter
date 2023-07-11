import React,{ useState , useEffect} from "react";
import './App.css';
import CurrencyRow from './currencyRow';

const BASE_URL="https://v6.exchangerate-api.com/v6/87f578b821be830efe669a71/latest/USD";


function App() {
 const [currencyOptions,setCurrencyOptions]=useState([])
 const [fromCurrency,setFromCurrency]=useState("USD")
 const [toCurrency,setToCurrency]=useState("INR")
 const [exchangeRate,setExchangeRate]=useState(1)
 const [amount,setAmount]=useState(1)
 const [amountFromCurrency,setAmountFromCurrency]=useState(true)

let toAmount,fromAmount
  if(amountFromCurrency && !isNaN(exchangeRate)){
    fromAmount=amount
    toAmount=amount*exchangeRate
  }else if(!amountFromCurrency && !isNaN(exchangeRate)){
    toAmount=amount
    fromAmount=amount/exchangeRate
  }
  console.log(exchangeRate)
  
  useEffect(()=>{
    fetch(BASE_URL)
     .then(res=>res.json())
     .then(data=>{
      setCurrencyOptions([...Object.keys(data.conversion_rates)])
      const newexchange=(data.conversion_rates["INR"]);
      setExchangeRate(newexchange)
     });
  },[])

  useEffect(()=>{
    if(fromCurrency!==undefined && toCurrency!==undefined)
    {
      fetch(BASE_URL)
      .then(res=>res.json())
      .then(data=>setExchangeRate(data.conversion_rates[toCurrency]/data.conversion_rates[fromCurrency]))
    }
  },[fromCurrency,toCurrency])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }

  return (
    <div className="converter">
      <h1>currency converter</h1>
      <div>
      <CurrencyRow currencyOptions={currencyOptions} selectCurrency={fromCurrency}
        onChangeCurrency={e=>setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'>&#8645;</div>
      <CurrencyRow currencyOptions={currencyOptions} selectCurrency={toCurrency}
        onChangeCurrency={e=>setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
      </div>
    </div>
  );
}

export default App;
