import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // Method for generating password:
  const passwordGenerator = useCallback(() => {
    let pass = "" // Generated password will go here
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  // Data from we are going to created password
    
    // Condidtion
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+[]{}~"

    // Loop for length of string
    for(let i=1;i<=length;i++)
    {
      const charAtRandomPosition = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charAtRandomPosition)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])
  
  // useEffect Hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  // useRef Hook
  const passwordRef = useRef(null)
  
  // Handler for copying text to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()   // To select which text is being copied
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-slate-500"
      >
        <h1 className="text-4xl text-center text-white my-3">Password Generator</h1>
        <div 
          className="flex shadow rounded-lg overflow-hidden mb-4"
          >
            <input 
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              Copy
            </button>
        </div>
          <div
            className="flex text-sm gap-x-2"
          >
            <div
              className="flex items-center gap-x-1"
            >
              {/* For selecting particular range */}
              <input 
                type="range" 
                min={8}
                max={100}
                id="lengthInput"
                value={length}
                className="cursor-pointer"
                onChange={(event) => setLength(event.target.value)}
              />
              <label htmlFor="lengthInput">Length : {length}</label>
            </div>
            <div
              className="flex items-center gap-x-1"
            >
              {/* For allowing numbers in password */}
              <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="numberInput">Number</label>
            </div>
            <div
              className="flex items-center gap-x-1" 
            >
              {/* For allowing special characters in password */}
              <input 
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="charInput">Special Character</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
