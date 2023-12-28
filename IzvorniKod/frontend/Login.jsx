import React, { useState } from "react";

export const Login = () => {
    
    return (
        <div className="auth-form-container">
            <h1>DentAll</h1>
            <form className="login-form">
                <label for= "">korisničko ime</label>
                    <input type="text" placeholder= "mojeime123" lozinka="lozinka"/>
                    <label for= "lozinka">lozinka</label>
                    <input type="text" placeholder= "*********" lozinka="lozinka"/>
                <button>Log in</button>
            </form>
       </div>
    )
}