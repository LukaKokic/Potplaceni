import React, { useState } from "react";

export const Login = () => {

    return (
        <div className="auth-form-container">
            <h1>DentAll</h1>
            <form className="login-form">
                <label for= "">Username</label>
                    <input type="text" placeholder= "Username" lozinka="Username"/>
                    <label for= "lozinka">lozinka</label>
                    <input type="text" placeholder= "********" lozinka="Password"/>
                <button>Log in</button>
            </form>
       </div>
    )
}