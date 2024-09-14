import { useState , useCallback , useEffect , useRef} from 'react'

function App() {

  const [password,setPassword] = useState('');
  const [isNumber,setIsNumber] = useState(false);
  const [isCharacter,setIsCharacter] = useState(false);
  const [length,setLength] = useState('8');

const passwordGenerator = useCallback(()=>
{
    let pass = '';
    let str = 'ABCDEFGHIJKLMANOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(isNumber) str += '0123456789';
    if(isCharacter) str += `'~!@#$%^&*|/?:";`;
    for(let i = 0;i<length;i++)
    {
      let idx = Math.floor(Math.random() * str.length);
      pass += str[idx];
    }
    setPassword(pass);
} ,[isNumber,isCharacter,length,setPassword]);

useEffect(()=>{
	passwordGenerator();
},[isNumber,isCharacter,length,passwordGenerator])

let passref = useRef(null);
const copyToClipboard = useCallback(()=>
	{
		passref.current?.select();
		window.navigator.clipboard.writeText(password);
	},[password])

  return (
    <div className='bg-yellow-200 h-screen w-full p-20'>  
      <main className='w-3/4 mx-auto bg-blue-500 flex-wrap rounded-3xl p-8 text-center'>
        <h2 className='text-xl text-white text-wrap m-3'>Password Generator</h2>
			
        <input type="text" className='rounded-lg w-1/4' value={password} ref = {passref} />
        <button className='bg-blue-800 p-1 w-1/12 rounded-xl text-white'
		onClick={copyToClipboard}
		> Copy </button>
        <br />
		<div className='flex gap-x-2  justify-center'>
			<input type="range" 
			className='mx-4 cursor-pointer' 
			min={1} max={20} 
			value={length}
			onChange={(e)=>{
				setLength(e.target.value);
			}}
			/>
			<label>Length : {length}</label>

			<input type='checkbox' 
			id='Number'
			defaultChecked = {isNumber}
			onChange={()=>{
				setIsNumber((prev)=> !prev);
			}}
			/>
			<label htmlFor="Number">Number</label>

			<input type='checkbox' 
			id='Character'
			defaultChecked = {isCharacter}
			onChange={()=>{
				setIsCharacter((prev)=> !prev);
			}}
			/>
			<label htmlFor="Character">Character</label>
		 </div>
      </main>
    </div>
  )
}

export default App
