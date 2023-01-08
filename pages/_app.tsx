


import { AppProps } from "next/app";
import "../styles/app.scss";
import styles from "../styles/index.module.scss"; 
import Navbar from "../components/Navbar";
import Head from "next/head";


const Wavyfy = ({ Component, pageProps } : AppProps) => {
    return (
        <main id={ styles.main }>
            <Head>
            <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT&family=Oleo+Script+Swash+Caps&family=Sail&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;500&family=Inter:wght@200;300&family=Rubik:wght@300;500&display=swap" rel="stylesheet"></link>
            </Head>

            <Navbar />

            <Component { ... pageProps } />
        </main>
    )
}

export default Wavyfy; 

