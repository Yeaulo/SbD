import React, { useState, useEffect } from "react";
import "../../styles/ViewSmarter/smartmeter.css";
import DropDown from "../usables/DropDown";
import Table from "./Table";

export default function ViewSmartmeter() {


    const information1 = ['Zählerstand', 'Zählernummer', 'Zählbeginn']
    const information2 = ['Stromzählerstandort', 'Straße/Nr', 'PLZ/ORT']

    const [isLoading, setIsLoading] = useState(false);
    const [valuelist, setValuelist] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/api/measurements/");
            const data = await response.json();
            let smartmeterList = [];
            data.data.map((item, index) => {
              smartmeterList.push({
                // name: "Smartmeter " + (index + 1),
                // id: item.smartmeter_id_id,
                value: item.value,
              });
            });
            const valuelist = [...smartmeterList, ...Array(12-smartmeterList.length).fill({value: "NULL"})]
            setValuelist(valuelist);
            // setSmartmeter(smartmeterList);
            // setSelectedSmartmeterId(smartmeterList[0].id);
            // getContractData(smartmeterList[0].id);
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };
        fetchData();
    
        setIsLoading(false);
      }, []);

    return (
        <div className="smartmeter-container">
            <div className="smartmeter-outer-left">
                <div className="smartmeter-inner-left_top_left">
                    <p className="smartmeter-header-text">Verbrauch in diesem Monat</p>
                </div>
                <div className="smartmeter-inner-left_top_right">
                    <p className="smartmeter-header-text">Durchschnittlicher Verbrauch</p>
                </div>
                <div className="smartmeter-inner-left_middle">
                    <p className="smartmeter-header-text">Verbrauchsübersicht</p>
                    <Table valuelist={valuelist} />
                </div>
                <div className="smartmeter-inner-left_bottom">
                    <p className="smartmeter-header-text">Vertragsdaten:</p>
                </div>
            </div>
            <div className="smartmeter-outer-right">
                <div className="smartmeter-header">
                    <p className="smartmeter-heading-right-title">Stromzählerinformationen</p>
                </div>
                <div className="smartmeter-inner-right">
                    {information1.map((item, index) => (
                        <p key={index} className="smartmeter-header-text">{item}:</p>
                    ))}
                    <hr style={{ borderWidth: "0%", borderColor: "black" }}></hr>
                    {information2.map((item, index) => (
                        <p key={index} className="smartmeter-header-text">{item}:</p>
                    ))}
                </div>
            </div>
        </div>
    )
}