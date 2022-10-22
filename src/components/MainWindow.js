import React, { useRef, useState } from 'react';
import Copy, { lowercaseList, numberList, symbolsList, uppercaseList, messageSuccess, messageFail } from './othersElements';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cs = console.log;

function MainWindow(props) {

    const [passwordFinal, setPasswordfinal] = useState('');

    const uppercaseCheckbox = useRef();
    const lowercaseCheckbox = useRef();
    const numberCheckbox = useRef();
    const symbolCheckbox = useRef();
    const passwordSize = useRef();

    const setCaracterComplexity = () => {
        let password = "";
        if (uppercaseCheckbox.current.checked) {
            password = password + uppercaseList;
        }
        if (lowercaseCheckbox.current.checked) {
            password = password + lowercaseList;
        }
        if (numberCheckbox.current.checked) {
            password = password + numberList;
        }
        if (symbolCheckbox.current.checked) {
            password = password + symbolsList;
        }
        return password
    }

    const handleClick = () => {
        const combinaison = setCaracterComplexity();
        let passwordCreated = '';
        if (combinaison === "") {
            notify('Please select at least one option', true);
        }
        else {
            for (let i = 0; i < passwordSize.current.value; i++) {
                const a = Math.round(Math.random() * combinaison.length);
                const b = combinaison.charAt(a);
                passwordCreated = passwordCreated + b;
            }
            setPasswordfinal(() => passwordCreated);
        }
    }

    const handleCopy = () => {
        if (passwordFinal === '') {
            notify(messageFail, true);
        }
        else {
            navigator.clipboard.writeText(passwordFinal).then(()=>notify(messageSuccess))
            .catch((err)=>{
                cs(err.message);
                notify(messageFail, true);
            })
        }
    }

    const notify = (message, error) => {
        if (error) {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }



    return (
        <div>
            <div id='main' className='h-screen w-full flex justify-center items-center'>
                <div id='container' className='h-fit w-fit bg-sky-200 rounded-xl shadow-2xl p-4'>
                    <div id='title'>
                        <h1 className='text-xl font-bold text-center'>Password Generator</h1>
                    </div>
                    <div id='passwordShowing' className='bg-green-500 p-2 rounded-md h-10 m-4 flex justify-between'>
                        <h4 className='text-md text-gray-900 mr-2'>{passwordFinal}</h4>
                        <button onClick={()=>handleCopy()}><Copy /></button>
                    </div>
                    <div className='flex justify-center items-center flex-col gap-4'>
                        <div>
                            <label htmlFor='passwordSize'>Password size</label>
                            <input ref={passwordSize} name='passwordSize' id="passwordSize" className='ml-2 w-10 text-center' type='number' defaultValue="26" />
                        </div>
                        <div>

                            <input ref={uppercaseCheckbox} id='uppercaseCheckbox' className='mr-2' type='checkbox' />
                            <label htmlFor='uppercaseCheckbox'>Uppercase</label>
                        </div>
                        <div>

                            <input ref={lowercaseCheckbox} id='lowercaseCheckbox' className='mr-2' type='checkbox' />
                            <label htmlFor='lowercaseCheckbox'>Lowercase</label>
                        </div>
                        <div>

                            <input ref={numberCheckbox} id='numberCheckbox' className='mr-2' type='checkbox' />
                            <label htmlFor='numberCheckbox'>Numbers</label>
                        </div>
                        <div>

                            <input ref={symbolCheckbox} id='symbolCheckbox' className='mr-2' type='checkbox' />
                            <label htmlFor='symbolCheckbox'>Symbols</label>
                        </div>
                        <div id='Generator'>
                            <button id='Generator' onClick={() => handleClick()} className='bg-green-700 p-2 text-white font-bold rounded-md px-10'>Generate</button>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        </div>
    );
}

export default MainWindow;