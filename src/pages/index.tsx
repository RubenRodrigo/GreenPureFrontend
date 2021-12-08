import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '../components/Navbar/Navbar'
import ingfon from '../components/Images/Index.png'
import '../styles/Home.module.css'


const Home: NextPage = () => {


  return (

    <div className="w-full h-full relative overflow-hidden" style={styles.fondo}>
      <header className="relative z-50 w-full h-24">
        <div className="container flex items-center justify-center h-full max-w-6x1 px-8 mx-auto sm:justify-between xl:px-0" style={{
          position: "absolute",
          marginLeft: "4%"
        }}>
            <a href="/" className="relative flex items-center inline-block h-5 h-full font-black leading-none">
                <svg className="w-auto h-6 text-indigo-600 fill-current" viewBox="0 0 194 116"
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill-rule="evenodd">
                        <path
                            d="M96.869 0L30 116h104l-9.88-17.134H59.64l47.109-81.736zM0 116h19.831L77 17.135 67.088 0z" />
                        <path d="M87 68.732l9.926 17.143 29.893-51.59L174.15 116H194L126.817 0z" />
                    </g>
                </svg>
                <span className="ml-3 text-xl text-gray-800">GreenPure</span>
            </a>
            <nav id="nav" style={{marginRight: "30%"}}
                className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative">
                <a href="#"
                    className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-green-600" >Home</a>
                <a href="#features"
                    className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-green-600">Blog</a>
                <a href="#features"
                className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-green-600">Productos</a>
                <a href="#features"
                className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-green-600">Contactos</a>
                <a href="#pricing"
                    className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-green-600" >Sobre Nosotros</a>
                <a href="#testimonials"
                    className="mr-0 font-bold duration-100 md:mr-3 lg:mr-8 transition-color hover:text-green-600"></a>
                <a href="#testimonials"
                    className="font-bold duration-100 transition-color hover:text-green-600"></a>
            </nav>

            <div id="nav-mobile-btn"
                className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10">
                <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
                <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
            </div>
        </div>
      </header>

      <div className="relative items-center justify-center w-full  xl:pt-20 xl:pb-64" >
          <div
              className="container flex flex-col items-center justify-between h-full       px-8 mx-auto -mt-32 lg:flex-row xl:px-0">
              <div 
                  className="z-30 flex flex-col items-center w-full max-w-xl pt-48 text-center lg:items-start lg:w-50 lg:pt-20 xl:pt-40 lg:text-left" style={{marginLeft: "5%"}}>
                  <h1 className="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8" style={styles.texto}>Mide la condición del aire y protege tus intereses</h1>
                  <p className="pr-0 mb-8 text-base text-gray-600 sm:text-lg xl:text-xl lg:pr-50">Con Greenpure y la ayuda de nuestros dispositivos puede estar al tanto de las condiciones del aire a su alrededor, previniendolo de daños a la salud y situaciones comprometedoras.</p>
                  <a href="#_"
                      className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-center font-bold text-white bg-gradient-to-r from-green-800 via-green-600 to-blue-700 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0 " style={styles.boton1} >IR A PANEL DE CONTROL</a>
                  <a href="#_"
                    className="relative self-start inline-block w-auto px-8 py-4 mx-auto mt-0 text-center font-bold text-white bg-gray-600 border-t border-gray-100 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0" style={styles.boton2}>CONTACTANOS</a>
              </div>
              <div className="relative z-50 flex flex-col items-end justify-center w-full h-full lg:w-1/2 ms:pl-10" style={{marginLeft: "15%", marginTop: "10%" }}>
                  <div className="container relative left-0 w-full max-w-4xl lg:absolute xl:max-w-6xl lg:w-screen">
                      <img src="https://i.ibb.co/JzmFR9C/Index.png"
                          className="w-full h-auto mt-20 mb-20 ml-0 lg:mt-24 xl:mt-40 lg:mb-0 lg:h-full lg:-ml-12" style={styles.imagen}></img>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
      
  )
}
const styles = {
  texto: {
    color: "#095073"
  },
  imagen:{
    width: "750px",
    height: "auto",
  },
  fondo: {
    backgroundImage: "url(https://i.ibb.co/HDP5VPW/fondo2.jpg)",
    backgroundSize: "cover"
    
  },
  boton1:{
    width:"90%", 
    borderEndStartRadius: "20px", 
    borderStartEndRadius: "20px", 
    borderStartStartRadius:"2px", 
    borderEndEndRadius:"2px", 
    marginBottom:"10px", 
    webkitBoxShadow: "10px 10px 1px #9E9E9E",
    mozBoxShadow: "10px 10px 1px #9E9E9E",
    boxShadow: "10px 10px 1px #9E9E9E"
  },
  boton2:{
    width:"90%", 
    borderEndStartRadius: "20px", 
    borderStartEndRadius: "20px", 
    borderStartStartRadius:"2px", 
    borderEndEndRadius:"2px", 
    marginTop: "5px", 
    webkitBoxShadow: "10px 10px 1px #9E9E9E",
    mozBoxShadow: "10px 10px 1px #9E9E9E",
    boxShadow: "10px 10px 1px #9E9E9E"
  }
}

export default Home
