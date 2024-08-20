import React, { useState } from 'react';
import '../css/currency.css';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';

const BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_fx3IO7iZbXh3eeO8AdWWKCjT2bq4BbMqT3AOsgEd";

function Currency() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);

    const exchange = async () => {
        try {
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
            const rate = response.data.data[toCurrency];
            const conversionResult = (rate * amount).toFixed(2);
            setResult(conversionResult);
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    return (
        <div className='currency-div'>
            <div style={{ fontFamily: 'arial', backgroundColor: 'black', color: 'white', width: '100%', textAlign: 'center' }}>
                <h3>DÖVİZ KURU UYGULAMASI</h3>
            </div>
            <div style={{ marginTop: '25px' }}>
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type='number'
                    className='amount'
                />

                <select onChange={(e) => setFromCurrency(e.target.value)} className='from-currency-option' value={fromCurrency}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                </select>
                <FaRegArrowAltCircleRight style={{ fontSize: '25px', marginRight: '10px' }} />

                <select onChange={(e) => setToCurrency(e.target.value)} className='to-currency-option' value={toCurrency}>
                    <option value="TRY">TRY</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>

                <input value={result} type='text' className='result' readOnly />
            </div>

            <div>
                <button onClick={exchange} className='exchange-button'>Çevir</button>
            </div>
        </div>
    );
}

export default Currency;
