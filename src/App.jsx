import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, SetLength] = useState(8);
  const [numberAllowed, SetNumberAllowed] = useState(false);
  const [charAllowed, SetCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  
  // useRef hook

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    
    // let pass = passwordRef.current;
    // console.log(pass);
    // console.log(pass.value);
    // window.navigator.clipboard.writeText(pass);
    window.navigator.clipboard.writeText(password);
  },[password])

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*_+=[]{}`";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  },[length,numberAllowed,charAllowed]);

  useEffect (()=>{
    // let pass = "";
    // let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // if(numberAllowed) str += "0123456789";
    // if(charAllowed) str += "!@#$%^&*_+=[]{}`";
    // for(let i=1;i<=length;i++){
    //   let char = Math.floor(Math.random()*str.length + 1);
    //   pass += str.charAt(char);
    // }

    // setPassword(pass);

    passwordGenerator();

  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='bg-blue-700 text-white px-3 py-1 hover:bg-violet-600'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
             type="range"
             min = {5}
             max = {20}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{SetLength(e.target.value)}}
            />
            <label>Length: {length}</label>
            <div className='sm:flex gap-1'>
                <div className='flex items-center gap-x-1'>
                  <input
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  id="numberAllowed"
                  onChange={()=>{
                    SetNumberAllowed((prev) => !prev)
                  }}
                  />
                  <label>Numbers</label>
                </div>
                <div className='flex items-center gap-x-1'>
                  <input
                  type="checkbox"
                  defaultChecked={charAllowed}
                  id="characterInput"
                  onChange={()=>{
                    SetCharAllowed((prev) => !prev)
                  }}
                  />
                  <label>Characters</label>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App


// import {useState} from 'react';

//  function App() {
//   // 👇️ initialize checked state to true
//   const [isSubscribed, setIsSubscribed] = useState(true);

//   const handleChange = () => {
//     setIsSubscribed(current => !current);
//   };

//   return (
//     <div>
//       <label htmlFor="subscribe">
//       <input
//           type="checkbox"
//           defaultChecked={true}
//           value={isSubscribed}
//           onChange={handleChange}
//           id="subscribe"
//           name="subscribe"
//         />
//         Subscribe
//       </label>
//     </div>
//   );
// }

// export default App
