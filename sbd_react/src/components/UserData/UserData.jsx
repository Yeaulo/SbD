import { useState } from "react"
import InputUserData from "./InputUserData"

export default function UserData(){
    const {userData, setUserData} = useState({
        first_name: "Bene",
    });

    return (
        <div className="outer-user-data"> 
            Nutzerdaten
            <div className="inner-user-data">
                <InputUserData propertyName="firstname" value={userData.first_name}/>
            </div>
        </div>
    )
}
{/* <InputUserData propertyName="lastname" value="Mustermann" onChange={() => handleChange("last_name")}/>
<InputUserData propertyName="e-mail" value="" onChange={() => handleChange("e-mail")}/> */}
    //     const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCredentials(prevState => ({
    //       ...prevState,
    //       [name]: value
    //     }));
    //   };
        // function handleChange(e, propertyName){
        //     const value = e.target.value
        //     setUserData(prevState => ({
        //         ...prevState,
        //         [propertyName]: value
        //     }));
        // }