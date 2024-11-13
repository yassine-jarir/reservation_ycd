 

interface InputFieldProps {
  tatalPassengers: number;
  checkCount: number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({tatalPassengers ,checkCount ,handleChange}:InputFieldProps) {
 
  return (
    <input 
     type='checkbox' onChange={handleChange} style={{ borderRadius: '5px', width: '50px', height: '50px', fontSize: '15pt', color: '#2e6c8e', backgroundColor: '#a6cde2', border: '3px solid #2e6c8e' }}
     disabled={checkCount >= tatalPassengers ? true : false} 
    />
   
  )
}

export default InputField
