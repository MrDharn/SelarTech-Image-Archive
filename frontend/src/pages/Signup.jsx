import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user'
    })

    //handling change on the input
    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    //handle submit
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            await API.post('/signup', formData);

            alert('signup successful');
            navigate('/');

        } catch(e){
            console.error(e)
        }
    }
    return(
        <div className='auth-container'>
            <div className='auth-card'>

                <h1 className='auth-title'>Signup</h1>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <input type="text" name='username' placeholder="username" onChange={handleChange}/>

                    <input type="email" name='email' placeholder="email" onChange={handleChange}/>

                    <input type="password" name='password' placeholder="password" onChange={handleChange}/>

                    <select name="role" id="" onChange={handleChange}>
                        <option value="user">
                            User
                        </option>

                        <option value="admin">
                            Admin
                        </option>
                    </select>

                    <button type='submit'>Signup</button>
                </form>
            </div>
        </div>
    )

}

export default Signup