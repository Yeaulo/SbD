import {React,  useState, useEffect} from "react"
import InputUserData from "./InputUserData"

export default function UserData(){
    const [userData, setUserData] = useState({ });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/customerData/');
                const data = await response.json();
                setUserData(data.data);

            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
        setIsLoading(false);
    }, []); 

    console.log(userData)

    function handleChange(e){
        const {name, value} = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="outer-user-data"> 
            Nutzerdaten
            <div className="inner-user-data">
                <InputUserData showName="firstname" propertyName={"first_name"} value={userData.first_name} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="lastname" propertyName= {"last_name"} value={userData.last_name} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="e-mail" propertyName= {"email"} value={userData.email} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="adress" propertyName= {"adress"} value={userData.adress} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="housenumber" propertyName= {"house_number"} value={userData.house_number} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="postcode" propertyName= {"post_code"} value={userData.post_code} onChange={handleChange} disabled={isLoading}/>
            </div>
        </div>
    )
}
