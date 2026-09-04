import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { register } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await register(name, email, password)
            navigate("/dashboard")
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F6F4] dark:bg-[#15191C] px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white dark:bg-[#1F2428] p-8 rounded-lg border border-[#DDE0DB] dark:border-[#2A3138]"
            >
                <h1 className="text-2xl font-semibold text-[#1C2321] dark:text-[#E7E9E4] mb-6">Create account</h1>

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mb-4 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                />

                <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mb-4 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                />

                <label className="block text-sm text-[#5C645F] dark:text-[#9AA39D] mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full mb-6 px-3 py-2 rounded-md border border-[#DDE0DB] dark:border-[#2A3138] bg-transparent text-[#1C2321] dark:text-[#E7E9E4] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-md bg-[#2F6F5E] text-white font-medium hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="text-sm text-[#5C645F] dark:text-[#9AA39D] mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-[#2F6F5E] font-medium">Log in</Link>
                </p>
            </form>
        </div>
    )
}

export default Register