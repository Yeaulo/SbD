import {React,  useState, useEffect} from "react"
import InputUserData from "./InputUserData"
import '../../styles/UserData/userdata.css'

let initialUserData;
const _ = require('lodash'); //used to compare objects

export default function UserData(){
    const [userData, setUserData] = useState({ });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/customerData/');
                const data = await response.json();
                setUserData(data.data);
                initialUserData = { ...data.data };
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
        setIsLoading(false);
    }, []); 

    function handleChange(e){
        const {name, value} = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function resetInput(){
        setUserData(initialUserData);
    }

    function submitNewInput(){
        const postData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/customerData/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
                if (response.status === 201){
                    console.log("Data updated successfully");
                }else if(response.status === 401){
                    console.log("Unauthorized");
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        postData();
        initialUserData = { ...userData };
    }

    const disableButtons = _.isEqual(initialUserData, userData)
    return (
        <div className="outer-user-data"> 
            <div className="heading-user-data">
                Nutzerdaten bearbeiten
            </div>
            <div className="inner-user-data">
                <InputUserData showName="firstname" propertyName={"first_name"} value={userData.first_name} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="lastname" propertyName= {"last_name"} value={userData.last_name} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="e-mail" propertyName= {"email"} value={userData.email} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="adress" propertyName= {"adress"} value={userData.adress} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="housenumber" propertyName= {"house_number"} value={userData.house_number} onChange={handleChange} disabled={isLoading}/>
                <InputUserData showName="postcode" propertyName= {"post_code"} value={userData.post_code} onChange={handleChange} disabled={isLoading}/>
               
                <div className="customer-data-button-div">
                        <button className="customer-data-button cancel-button" onClick={resetInput} disabled={disableButtons}>Cancel</button>
                        <button className="customer-data-button submit-button" onClick={submitNewInput} disabled= {disableButtons}>Submit</button>
                </div>     

            </div>
        </div>
 
    )
}
