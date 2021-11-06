import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface LoginValues {
  email: string
  password: string
}

const Login = () => {

  const router = useRouter()

  const [loginError, setLoginError] = useState('')
  const [formValues, setFormValues] = useState<LoginValues>({
    email: "",
    password: ""
  })

  type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  const handleChange = ({ target: { name, value } }: HandleInputChange) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await signIn('credentials', {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    })

    if (result && !result.error) {
      router.push('/')
    } else {
      console.log(result);
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="w-full flex justify-center min-h-screen">
        <div className="self-center max-w-lg w-full">
          <div className="pb-16 w-full">
            <p className="text-center font-semibold">Inciar Sesión</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="pb-4 w-full">
              <input
                name="email"
                type="email"
                className="border w-full rounded-md p-3"
                placeholder="Correo Electronico"
                onChange={handleChange}
              />
            </div>
            <div className="pb-6 w-full">
              <input
                name="password"
                type="password"
                className="border w-full rounded-md p-3"
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </div>
            <div className="pb-4 w-full">
              <button
                className="border rounded-md w-full p-3 bg-green-600 text-white"
              >Iniciar Sesión</button>
            </div>
          </form>
          <div className="py-4">
            <p className="text-center">¿No tienes una cuenta? <Link href="/signup"><a className="text-blue-500"> Registrate ahora</a></Link></p>
          </div>
          <div className="py-6 relative">
            <div className="w-full border border-gray-300"></div>
            <div className="absolute top-1 left-0 right-0 text-center">
              <span className="bg-white px-6">O también</span>
            </div>
          </div>
          <div className="pb-4 w-full">
            <button
              onClick={() => signIn("facebook")}
              className="border rounded-md w-full p-3 bg-blue-800 text-white"
            >
              <div className="relative">
                <span className="absolute left-0 top-0 h-full flex">
                  <FaFacebookF className="self-center text-2xl" />
                </span>
                <p className="w-full text-center">
                  Iniciar Sesión con Facebook
                </p>
              </div>
            </button>
          </div>
          <div className="pb-4 w-full">
            <button
              className="border border-gray-400 rounded-md w-full p-3 bg-white text-black"
            >
              <div className="relative">
                <span className="absolute left-0 top-0 h-full flex">
                  <FcGoogle className="self-center text-2xl" />
                </span>
                <p className="w-full text-center">
                  Iniciar Sesión con Google
                </p>
              </div>
            </button>
          </div>
          <div className="pt-20">
            <p className="text-center">
              Nuestros <span className="text-blue-500">Términos y Condiciones</span>
            </p>
          </div>
        </div>
      </div>

      <div className="illustration-bg">
      </div>
      <div className="relative">
        {/* <div className="ellipse-1">
        </div>
        <div className="ellipse-2">
        </div>
        <div className="ellipse-3">
        </div>
        <div className="ellipse-4">
        </div> */}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/', // some destination '/dashboard' Ex,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default Login
