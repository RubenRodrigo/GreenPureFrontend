import axios from 'axios';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react';

import { FaFacebookF } from 'react-icons/fa';

interface RegisterValues {
  email: string
  password: string
  first_name: string
  last_name: string
}

const SignUp = () => {

  const router = useRouter()

  const [registerError, setRegisterError] = useState('')
  const [formValues, setFormValues] = useState<RegisterValues>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  })

  type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  const handleChange = ({ target: { name, value } }: HandleInputChange) => {
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const res = await axios({
        method: 'post',
        url: process.env.NEXT_PUBLIC_URL_API + '/user/create/',
        data: {
          ...formValues
        }
      })
      if (res.status === 201) {
        router.push('/login')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="w-full flex justify-center min-h-screen">
        <div className="self-center max-w-lg w-full">
          <div className="pb-16 w-full">
            <p className="text-center font-semibold">Registrar Usuario</p>
          </div>
          <form onSubmit={handleRegister}>
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
            <div className="pb-6 w-full">
              <input
                name="first_name"
                type="text"
                className="border w-full rounded-md p-3"
                placeholder="Nombres"
                onChange={handleChange}
              />
            </div>
            <div className="pb-6 w-full">
              <input
                name="last_name"
                type="text"
                className="border w-full rounded-md p-3"
                placeholder="Apellidos"
                onChange={handleChange}
              />
            </div>
            <div className="pb-4 w-full">
              <button
                className="border rounded-md w-full p-3 bg-green-600 text-white"
              >Registrarse</button>
            </div>
          </form>
          <div className="py-4">
            <p className="text-center">¿Ya tienes una cuenta? <Link href="/login"><a className="text-blue-500"> Inicia sesión ahora</a></Link></p>
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

export default SignUp
