import { useState } from "react"
import AuthLayout from "../Layouts/AuthLayouts"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
const Register = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(`${import.meta.env.VITE_BASE_API_URL}/users`, {
          username,
          name,
          password,
        })
        .then((response) => {
          const msg = response.data.message
          Swal.fire({
            title: "Success",
            text: `${msg}`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(function () {
            navigate("/auth/login")
          })
        })
    } catch (e) {
      const message = e.response.data.errors
      Swal.fire({
        title: "Error",
        text: `${message}`,
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto">
        <AuthLayout
          title="Register Page"
          btnTitle="Register"
          text="Already Have Account?"
          linkTitle="Login  Now"
          linkto="/auth/login"
          handleSubmit={handleRegister}
        >
          <Input
            title="Username"
            placeholder="username..."
            handleInput={setUsername}
          />
          <Input title="Name" placeholder="name..." handleInput={setName} />
          <Input
            title="Password"
            placeholder="*****"
            typeInput="password"
            handleInput={setPassword}
          />
          <button
            type="submit"
            className="w-full text-white bg-fuchsia-700 hover:bg-fuchsia-500 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-900 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
          >
            Register
          </button>
        </AuthLayout>
      </div>
    </>
  )
}

export default Register
