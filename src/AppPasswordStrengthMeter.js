import React, { useState } from 'react';
import PasswordStrengthMeter from './component/PasswordStrengthMeter';

function App(){

    const [password,setPassword] = useState('')

    return(
        <div className="container" >
            <div className='.col-md-6.mx-auto'>
                <h1 className='text-center my-5' >Arwa Vohra</h1>
                <div className='form-group mb-1 ' >
                    <input
                     type='password'
                      className="form-control shadow-none" 
                      placeholder='Password' 
                      onChange={e => setPassword(e.target.value)}
                      ></input>
                      
                </div>
                <PasswordStrengthMeter password={password} />
            </div>
        </div>
    )
}

export default App;