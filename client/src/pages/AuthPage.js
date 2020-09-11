import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http"
import useMessage from "../hooks/message"

const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    function changeHandler(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    async function registerHandler() {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Reduce a link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your email address"
                                    id="email"
                                    type="text"
                                    name='email'
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">E-mail</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter your password"
                                    id="password"
                                    type="text"
                                    name='password'
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4'
                            style={{ marginRight: 10 }}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className='btn grey lighten-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;