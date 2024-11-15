import { useEffect, useState } from 'react'
import './App.css'
import Recherche from './component/Recherche';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from './component/InputField.t/InputField';
 import ReservationPDF from "./component/ReservationPDF"
import QRCode from 'react-qr-code';
 
interface FormData {
    firstNameLastName: string,
    email: string,
    prix: number,
    depart: string,
    arrive : string,
    date: string
}

interface Item {
    time1  : string,
    time2  : string,
 }

function App() {
  const [count, setCount] = useState<number>(0)
  const [formData, setformData] = useState<FormData>({
    firstNameLastName: "",
    email: "",
    prix: 0,
    depart: "",
    arrive : "",
    date: ""
  })

 const times:Item[] = [
    {
        time1: "8:00",
        time2: "10:00",
     },
    {
        time1: "10:00",
        time2: "12:00",
     },
    {
        time1: "14:00",
        time2: "18:00",
     },
    {
        time1: "20:00",
        time2: "22:00",
     }
 ]

function prevBack(){
  setCount(prev => prev - 1 );
}
// 
function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>){
    setformData((prevValue: FormData) =>( {
      ...prevValue,
      email: e.target.value
    })
    );
}
function handleChangeInputName(e: React.ChangeEvent<HTMLInputElement>){
    setformData((prevValue: FormData) =>( {
      ...prevValue,
      firstNameLastName: e.target.value
    })
    );
}
 
// adult data 
const [adultTotal, setAdultTotal] = useState(0);
const [childrenTotal, setChildrenTotal] = useState(0);

const tatalPassengers = adultTotal + childrenTotal 
const [adultTotalPrix, setAdultTotalPrix] = useState(500);
const [childrenTotalPrix, setChildrenTotalPrix] = useState(100);

const [totalPrix, setTotalPrix] = useState(0)

useEffect(() => {
    if(tatalPassengers > 12){
        toast.info('Total of the passenger is 12 !', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
             });
  }
    setAdultTotalPrix(()=> adultTotal * 500 )
    setChildrenTotalPrix(()=> childrenTotal * 100)
    setTotalPrix(() => childrenTotalPrix + adultTotalPrix)
    formData.prix = totalPrix
},[adultTotal, childrenTotal, adultTotalPrix, childrenTotalPrix, tatalPassengers, formData, totalPrix])

function adultInc(){
    setAdultTotal((num)=> num + 1 )
     
}
function adultDec(){
    setAdultTotal((num)=> num - 1 )
 }
 
function childrenInc(){
    setChildrenTotal((num)=> num + 1 )
     
}
function childrenDec(){
    setChildrenTotal((num)=> num - 1 )
 }

// count the checkbox 
const [checkCount, setCheckCount] = useState<number>(0)

function addNExt(){
    if(formData.email == "" || formData.firstNameLastName == "" ){
        toast.info('merci de remplir le nom et email', {
           position: "top-center",
           autoClose: 3000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
            });
       return
   }
   else if (count == 1){
    console.log(formData.arrive)
    if(formData.arrive == "" || formData.depart == "" ||  formData.date == ""){
        toast.info('merci de remplir tout la garre arrive && depart && date', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

        progress: undefined,
        theme: "colored",
         });
    return
}
}
   else if (count == 3){ 
    console.log(formData.arrive)
    if(tatalPassengers !== checkCount || tatalPassengers == 0 && checkCount  == 0 ){
        toast.info('merci de remplir tout les champ ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
         });
    return
}
}
  setCount(next => next + 1 );
}

function handleChange (e: React.ChangeEvent<HTMLInputElement>){
     setCheckCount((prevCount) => e.target.checked ? prevCount+1 : prevCount - 1 )

}
function handleSubmit(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    if(formData.email == "" && formData.firstNameLastName == ""){
             toast.info('merci de remplir le nom et email', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                 });
            return
        }
    addNExt()
}
 

function handleArrive(e: React.ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value)
    formData.arrive = e.target.value
}

function handleDepart(e: React.ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value)
    formData.depart = e.target.value
    
}

function handleDate(e:  React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value)
    formData.date = e.target.value

}
console.log(formData)
 
  return (
    <div className='h-[500px] bg   flex justify-between flex-col'>

          <ol className="h-[100px] rounded-[20px] border justify-center flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">

              <li className={`${count == 0 ? "text-blue-600" : ""} flex items-center`}>
                  <span className="flex items-center justify-center w-5 h-5 me-2  border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                      1
                  </span>
                  <span className="text-xs hidden sm:inline-flex sm:ms-2 text-">Commencer la reservation</span>
                  <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                  </svg>
              </li>
              <li className={`${count == 1 ? "text-blue-600" : ""} flex items-center`}>
                  <span className="flex items-center justify-center w-5 h-5 me-2  border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                      2
                  </span>
                  <span className="text-xs  hidden sm:inline-flex sm:ms-2">La gare et la date de départ</span>
                  <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                  </svg>
              </li>
              <li className={`${count == 2 ? "text-blue-600" : ""} flex items-center`}>
                  <span className="flex items-center justify-center w-5 h-5 me-2  border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                      3
                  </span>
                  <span className="text-xs hidden sm:inline-flex sm:ms-2">Les resultat de recherche</span>
                  <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                  </svg>
              </li>

              <li className={`${count == 3 ? "text-blue-600" : ""} flex items-center`}>
                  <span className="flex items-center justify-center w-5 h-5 me-2  border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                      5
                  </span>
                  <span className="text-xs hidden sm:inline-flex sm:ms-2">Voyageurs</span>
                  <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                  </svg>
              </li>
              <li className={`${count == 4 ? "text-blue-600" : ""} flex items-center`}>
                  <span className="flex items-center justify-center w-5 h-5 me-2  border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                      6
                  </span>
                  <span className=" hidden sm:inline-flex sm:ms-2">Les tickets</span>
              </li>

          </ol>

          <ToastContainer />

          <div className=' m-auto w-[800px]'>
              {count == 0 &&
                  <form className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Commencer la reservation</h5>
                      <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Réservez votre prochain vol en toute simplicité grâce à notre système de réservation sécurisé. Choisissez votre destination, sélectionnez vos dates et réservez votre siège en quelques clics. Profitez d'options flexibles et d'offres exclusives pour une expérience de voyage agréable, le tout au meilleur prix !</p>
                      <div className="justify-center flex items-end content-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                          <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom et prénom</label>
                              <input onChange={handleChangeInputName} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                          </div>
                          <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                              <input onChange={handleChangeInput} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                          </div>
                          <button onClick={(e) => { handleSubmit(e); } }>submit</button>
                      </div>
                  </form>}
              {count == 1 &&
                  <form className="max-w-sm mx-auto">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">La gare de depart</label>
                      <select onChange={handleArrive} id="small" className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected disabled>La gare d'arriver</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="France">France</option>
                          <option value="Germany">Germany</option>
                      </select>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">la gare d'arriver</label>
                      <select onChange={handleDepart} id="default" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected disabled>La gare de depart </option>
                          <option value="Morocco">Morocco</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Sinigal">Sinigal</option>
                          <option value="Cameron">Cameron</option>
                      </select>
                      <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                          </div>
                          <input onChange={handleDate} id="default-datepicker" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                      </div>
                  </form>}
              {count == 2 && <div className=" flex-col mx-auto my-[20px]  w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center justify-center mb-4">
                      <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> les resultat de recherche</h5>

                  </div>
                  <div className="flow-root">
                      <ul role="list" className="divside-y divide-gray-200 dark:divide-gray-700">
                          {times.map((item) => {
                              return <Recherche times={item} />;
                          }
                          )}
                      </ul>
                  </div>
              </div>}
              {count == 3 && <div className="">
                  <h1>Voyageurs</h1>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                      <div>
                          <h4>Adult (Prix {adultTotalPrix}DH)</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button
                                  onClick={adultInc} style={{ borderRadius: '50%', width: '50px', height: '50px', fontSize: '15pt', color: '#2e6c8e', backgroundColor: '#a6cde2', border: '3px solid #2e6c8e' }}>
                                  +
                              </button>
                              <span>{adultTotal}</span>
                              <button
                                  onClick={adultDec} disabled={adultTotal <= 0 ? true : false} style={{ borderRadius: '50%', width: '50px', height: '50px', fontSize: '15pt', color: '#2e6c8e', backgroundColor: '#a6cde2', border: '3px solid #2e6c8e' }}>
                                  -
                              </button>
                          </div>
                      </div>
                      <div style={{ width: '5px', backgroundColor: '#2e6c8e' }}></div>
                      <div>
                          <h4>Enfant (Prix {childrenTotalPrix}DH)</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <button
                                  onClick={childrenInc} style={{ borderRadius: '50%', width: '50px', height: '50px', fontSize: '15pt', color: '#2e6c8e', backgroundColor: '#a6cde2', border: '3px solid #2e6c8e' }}>
                                  +
                              </button>
                              <span>{childrenTotal}</span>
                              <button
                                  onClick={childrenDec} disabled={childrenTotal <= 0 ? true : false} style={{ borderRadius: '50%', width: '50px', height: '50px', fontSize: '15pt', color: '#2e6c8e', backgroundColor: '#a6cde2', border: '3px solid #2e6c8e' }}>
                                  -
                              </button>
                          </div>
                      </div>
                  </div>

                  <h4 className='mb-[3rem]'>Choisissez votre place</h4>
                  <div style={{ display: 'grid', justifyContent: 'center', gridTemplateColumns: 'auto auto auto auto', gap: '20px' }}>

                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />


                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />

                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />

                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                      <InputField tatalPassengers={tatalPassengers} handleChange={handleChange} checkCount={checkCount} />
                  </div>
                  <h4 className='mt-[2rem]'>Prix Total : {totalPrix}DH</h4>
              </div>}

              {count == 4 && <div className="tab tab-4 mt-[4rem]">
                  {Array.from({ length: adultTotal }).map(() => {
                      return <div className='mt-[3rem]' style={{  height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div className="card content" style={{ height: '400px', maxWidth: '600px', background: '#fff', padding: '20px', borderRadius: '10px', backgroundSize: 'cover', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                              <div className="user-info" style={{ marginBottom: '20px' }}>
                                  <p style={{ marginBottom: '10px' }}>
                                      Voyageur: <span style={{ fontWeight: 'bold' }}>Adult</span>
                                  </p>
                                  <p style={{ marginBottom: '10px' }}>
                                      Prix: <span style={{ fontWeight: 'bold' }}>500 DH</span>
                                  </p>
                                  <p style={{ marginBottom: '10px' }}>
                                      Date de réservation: <span style={{ fontWeight: 'bold' }}>{formData.date}</span>
                                  </p>
 
                              </div>
                              <div className="qr-code" style={{ textAlign: 'center' }}>
                                  <p>Code QR :</p>

                                  {/* <img src={qrcodeimg} alt="code QR" style={{ width: '150px', height: '150px', marginTop: '10px' }} /> */}
                                  <QRCode
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value="uyy"
                                    viewBox={`0 0 256 256`}
                                />
                              </div>
                          </div>
                          </div>
                          })}
            {Array.from({ length: childrenTotal }).map(() => {
                      return <div className='mt-[3rem]' style={{  height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div className="card content" style={{ height: '400px', maxWidth: '600px', background: '#fff', padding: '20px', borderRadius: '10px', backgroundSize: 'cover', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                              <div className="user-info" style={{ marginBottom: '20px' }}>
                                  <p style={{ marginBottom: '10px' }}>
                                      Voyageur: <span style={{ fontWeight: 'bold' }}>Enfant</span>
                                  </p>
                                  <p style={{ marginBottom: '10px' }}>
                                      Prix: <span style={{ fontWeight: 'bold' }}>100 DH</span>
                                  </p>
                                  <p style={{ marginBottom: '10px' }}>
                                      Date de réservation: <span style={{ fontWeight: 'bold' }}>{formData.date}</span>
                                  </p>
 
                              </div>
                              <div className="qr-code" style={{ textAlign: 'center' }}>
                                  <p>Code QR :</p>
                                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TEST" alt="code QR" style={{ width: '150px', height: '150px', marginTop: '10px' }} />
                                  {/*<QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100px" }}
                                        value="uyy"
                                        viewBox={`0 0 256 256`}
                                    /> */}
                              </div>
                          </div>
                          </div>
                          })}

              <ReservationPDF reservation={formData} />
          </div>
          }
      </div>
      <div className='justify-around flex'>
              <button disabled={count <= 0 ? true : false} onClick={prevBack} type="button" className=" flex f text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Back</button>

              <button disabled={count >= 4 ? true : false} onClick={addNExt} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>

          </div>
       
    </div>
  )
}

export default App;
