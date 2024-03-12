import { useState, useEffect } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] =useState({})  // Initial value will  be an empty object

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((respone) => {
            return respone.json()
            // console.log(respone.json())
        })
        .then((res) => {
            setData(res[currency])
        })
    }, [currency])
    console.log(data)
    return data
}

export default useCurrencyInfo

