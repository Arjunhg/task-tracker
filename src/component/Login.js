import { useState } from "react";
import { saveUser } from "../utility/localStorage";

const Login = ({onLogin}) => {

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!username.trim()){
            setError("Username cannot be empty");
            return;
        }

        saveUser(username.trim());
        onLogin();

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Heading */}
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome to Task Tracker
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your username to get started
                    </p>
                </div>
                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            placeholder="Enter your username"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setError("");
                            }}
                        />
                        {
                            error && (
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            )
                        }
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Get Started
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login;