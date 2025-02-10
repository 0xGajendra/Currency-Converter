import React, { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0); //Amount to be converted
  const[from, setFrom] = useState("usd"); //Currency of Current Amount
  const[to, setTo] = useState("inr"); //Currency to which the Amount it should be converted
  const [convertedAmount, setConvertedAmount] = useState(0); // Cunverted Amount

  //Getting currency infro from the API
  const currencyInfo = useCurrencyInfo(from);
  
  //currency options for drop down
  const options = Object.keys(currencyInfo);

  const swap = ()=> {
    
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])  
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://i.redd.it/saikxo1w43ie1.jpeg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                         //whenever a form gets submitted, it goes somewhere (like a post method) , we don't want that so we use prevent default so form does not get submitted
                         convert();
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount = {amount}
                            currencyOption={options}
                            onCurrencychange={(currency)=> setFrom(currency)}
                            selectCurrency={from}
                            onAmoutChange={(amount)=> setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 cursor-pointer"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount = {convertedAmount}
                            currencyOption={options}
                            onCurrencychange={(currency)=> setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg cursor-pointer">
                        Convert from {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
