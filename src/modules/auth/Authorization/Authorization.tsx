import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLoginFormConfig from "../../../hooks/useLoginFormConfig";
import useRegFormConfig from "../../../hooks/useRegFormConfig";

import "./authorizationStyle.scss"

function Authorization() {

    let login = useLoginFormConfig(),
        register = useRegFormConfig(),
        navigate = useNavigate(),
        isThereUser: boolean = Boolean(localStorage.getItem('CurUser'));

    useEffect(() => {
        if (isThereUser) navigate('/profile')
    }, [])

    return (
        <div className="auth">
            {!isThereUser &&
                <>
                    <div className="auth__log">
                        <form onSubmit={login.handleSubmit} className="auth__log-form">
                            <h2 className="auth__log-head">Log In</h2>
                            <input className="auth__log-name" type="text" placeholder="Your login" 
                                    id="logLogin"
                                    name="logLogin"
                                    onChange={login.handleChange}
                                    value={login.values.logLogin} />
                            <input className="auth__log-pass" type="password" placeholder="Password" 
                                    id="logPassword"
                                    name="logPassword"
                                    onChange={login.handleChange}
                                    value={login.values.logPassword} />
                            <div className="auth__buttons">
                                <button type="submit" className="auth__log-btn">Submit</button>
                                {(login.errors.logLogin || login.errors.logPassword) &&
                                    <>
                                        <div className="auth__log-question">
                                            ?
                                            <div className="auth__log-error">
                                                {login.errors.logLogin &&
                                                    <div className="auth__log-warn">
                                                        {login.errors.logLogin}
                                                    </div>
                                                }
                                                {login.errors.logPassword &&
                                                    <div className="auth__log-warn">
                                                        {login.errors.logPassword}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="auth__reg">
                        <form  onSubmit={register.handleSubmit} className="auth__reg-form">
                            <h2 className="auth__reg-head">Register</h2>
                            <input className="auth__reg-name" type="text" placeholder="Your login"  
                                    id="regLogin"
                                    name="regLogin"
                                    onChange={register.handleChange}
                                    value={register.values.regLogin} />
                            <input className="auth__reg-pass" type="password" placeholder="Password" 
                                    id="regPassword"
                                    name="regPassword"
                                    onChange={register.handleChange}
                                    value={register.values.regPassword} />
                            <div className="auth__buttons">
                                <button type="submit" className="auth__reg-btn">Submit</button>
                                {(register.errors.regLogin || register.errors.regPassword) &&
                                    <>
                                        <div className="auth__reg-question">
                                            ?
                                            <div className="auth__reg-error">
                                                {register.errors.regLogin &&
                                                    <div className="auth__reg-warn">
                                                        {register.errors.regLogin}
                                                    </div>
                                                }
                                                {register.errors.regPassword &&
                                                    <div className="auth__reg-warn">
                                                        {register.errors.regPassword}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </form>
                    </div>
                </>
            }
        </div>
    )
}

export default Authorization