import React, {useState} from 'react';

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    function changeHandler(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
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
                        <button className='btn yellow darken-4' style={{ marginRight: 10 }}>Войти</button>
                        <button className='btn grey lighten-1 black-text'>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;