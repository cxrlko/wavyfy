



import * as React from "react"
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Textfield, textfieldType } from "../../components/textfield"


interface INavBarProperties
{

}

function NavBar()
{
 
    const navigate = useNavigate(); 


    React.useEffect(() => 
    { 


    }, []);

    // #region Component 
    return (
    <nav>

        <div className="navigation">
            <Logo />



        </div>

        <div className="links">

            <Link className="search icon" to={ `/search` } children=
            {

                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.375 15.75C13.172 15.75 16.25 12.672 16.25 8.875C16.25 5.07804 13.172 2 9.375 2C5.57804 2 2.5 5.07804 2.5 8.875C2.5 12.672 5.57804 15.75 9.375 15.75Z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.5599 14.6849L18.1369 18.0181" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

            }/>
        
        </div>  
    </nav>
    )
    // #endregion




}





// #region logo
function Logo()
{
    return (

    <Link to={ `/` } id="Logo" className="icon" children=
    {
    <>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 23.9996C0 10.7451 10.7454 0 23.9999 0C37.2549 0 48 10.7451 48 23.9996C48 37.2555 37.2549 48 23.9999 48C10.7454 48 0 37.2555 0 23.9996ZM10.3146 18.5011C17.6998 16.2597 30.4604 16.6821 38.1966 21.2764C39.2607 21.9098 40.6395 21.5581 41.2723 20.4914C41.9045 19.4265 41.5549 18.0488 40.4879 17.4155C31.5819 12.1287 17.4891 11.6318 9.01123 14.2051C7.82446 14.5656 7.15585 15.8189 7.51523 17.0056C7.87433 18.1915 9.12845 18.861 10.3146 18.5011ZM35.3694 28.6973C36.249 29.2381 37.4005 28.9619 37.9433 28.0812C38.4841 27.2025 38.2072 26.0504 37.3277 25.5088C29.9199 20.9563 19.0837 19.6752 10.3671 22.3204C9.37921 22.6214 8.82122 23.6645 9.11927 24.6539C9.41991 25.6417 10.4651 26.1994 11.4544 25.9005C19.0848 23.5843 28.92 24.733 35.3694 28.6973ZM35.0066 34.6163C34.5753 35.3236 33.6545 35.5451 32.9498 35.1141C27.314 31.6696 20.2203 30.8918 11.8662 32.7999C11.0612 32.9844 10.2588 32.48 10.0753 31.6753C9.89077 30.8703 10.3935 30.0678 11.2002 29.8841C20.3424 27.7943 28.1843 28.6936 34.5102 32.5591C35.2155 32.9899 35.4376 33.9113 35.0066 34.6163Z"/>
        </svg>

        <p>Spotify</p>
    </>
    }/>

    )
}
// #endregion

export { NavBar }





