import React, { useState, useEffect } from "react";
import "../../styles/ViewSmarter/smartmeter.css";
import DropDown from "../usables/DropDown";
import Table from "./Table";

export default function ViewSmartmeter() {


    const information1 = [
      { label: 'Zählerstand', value: 'Wert1' },
      { label: 'Zählernummer', value: 'Wert2' },
      { label: 'Zählbeginn', value: 'Wert3' }
    ];
    //const information2 = ['Stromzählerstandort', 'Straße/Nr', 'PLZ/ORT']

    const [isLoading, setIsLoading] = useState(false);
    const [valuelist, setValuelist] = useState([]);
    const [smartmeterList, setSmartmeteListr] = useState([]);
    const [lastvalue, setLastvalue] = useState(0);
    const [avarge, setAvarge] = useState(0);
    const [selectedSmartmeterId, setSelectedSmartmeterId] = useState(1);
    const [smartmeter, setSmartmeter] = useState([]);
    const [address, setAddress] = useState(['-']);
    const [house_number, setHouse_number] = useState(['-']);
    const [post_code, setPost_code] = useState(['-']);
    const [smartmeter_id, setSmartmeter_id] = useState(['-']);
    const [start, setStart] = useState(['-']);
    

    function onSelectedSmartMeterChange(id) {
      setSelectedSmartmeterId(id);
      //getContractData(id);
      getMeasurements(id);
      getInformation(id,lastvalue);

    }
    
    function avarageValue(smartmeterList) {
        let sum = 0;
        smartmeterList.map((item, index) => {
            sum += item.value;
        });
        return sum / smartmeterList.length;
    }
    function getInformation(smartmeter_id,lastvalue) {
      // setInformation(information1);
      setSmartmeter_id(smartmeter_id);
      setStart(smartmeter[smartmeter_id].start);
      setAddress(smartmeter[smartmeter_id].address);
      setHouse_number(smartmeter[smartmeter_id].house_number);
      setPost_code(smartmeter[smartmeter_id].post_code);
      
    
      // Hier könnten weitere Operationen mit information1 erfolgen
    
      // return information1;
    }
    

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/api/smarterAll/");
            const data = await response.json();
            let smartmeterList = [];
            data.data.map((item, index) => {
              smartmeterList.push({
                name: "Smartmeter " + (index + 1),
                id: item.smartmeter_id,
                start: item.contract_start,
                address: item.address,
                house_number: item.house_numnber,
                post_code: item.post_code,
              });
            });
            console.log('allles: '+smartmeterList[2].address);
            setSmartmeter(smartmeterList);
            setSelectedSmartmeterId(smartmeterList[0].id);
           // getContractData(smartmeterList[0].id);
            getMeasurements(smartmeterList[0].id);

            // const information = getInformation(smartmeterList[0].id,lastvalue);
            // setInformation(information);
            getInformation(smartmeterList[0].id,lastvalue);
           // console.log("Liste"+information);
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };
        fetchData();
    
        setIsLoading(false);
      }, []);
    
      function getMeasurements(smartmeter_id) {
        setIsLoading(true);
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:8000/api/measurements/" + smartmeter_id + "/");
            const data = await response.json();
            let smartmeterListMeasurments = [];
            data.data.map((item, index) => {
              smartmeterListMeasurments.push({
                // name: "Smartmeter " + (index + 1),
                id: item.smartmeter_id,
                value: item.value,
              });
            });
            
            const valuelist = [...smartmeterListMeasurments, ...Array(12-smartmeterListMeasurments.length).fill({value: "-"})]
            setValuelist(valuelist);
            //setSmartmeteListr(smartmeterListMeasurments);
            const lastvalue = smartmeterListMeasurments[smartmeterListMeasurments.length - 1].value
            setLastvalue(lastvalue);
            
            const avarge = avarageValue(smartmeterListMeasurments);
            setAvarge(avarge);
            // setSmartmeter(smartmeterList);
            // setSelectedSmartmeterId(smartmeterList[0].id);
            //getContractData(smartmeterList[0].id);
          } catch (error) {
            console.error("Fetch error:", error);
          }
        };
        fetchData();
    
        setIsLoading(false);
      }

    return (
        <div className="smartmeter-container">
            <div className="smartmeter-outer-left">
                <div className="smartmeter-inner-left_top_left">
                    <p className="smartmeter-header-text">Verbrauch in diesem Monat</p>
                    <p className="smartmeter-value-text">{lastvalue} kwh / 10.69€</p>
                </div>
                <div className="smartmeter-inner-left_top_right">
                    <p className="smartmeter-header-text">Durchschnittlicher Verbrauch</p>
                    <p className="smartmeter-value-text">{avarge} kwh / 10.69€</p>
                </div>
                <div className="smartmeter-inner-left_middle">
                    <p className="smartmeter-header-text">Verbrauchsübersicht</p>
                    <Table valuelist={valuelist} />
                </div>
                <div className="smartmeter-inner-left_bottom">
                    <div className="smartmeter-header-text">Vertragsdaten:
                    <div className="smartmeter-header-text">Vertragsname: {start}</div>
                    <div className="smartmeter-header-text">Preis:{start} pro kwh</div>
                    </div>
                    <div class="vertical-line"></div>
                    <div className="smartmeter-header-text">Mindestlaufzeit:</div>
                    <div className="smartmeter-header-text">Kündigungsfrist:</div>
                </div>
            </div>
            <div className="smartmeter-outer-right">
                <div className="smartmeter-header-text">
                    <div className="smartmeter-heading-right-title">Stromzählerinformationen</div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <DropDown
            items={smartmeter}
            onChangeSelection={onSelectedSmartMeterChange}
            selectedId={selectedSmartmeterId}
          /></div>
                </div>
                <div className="smartmeter-inner-right">
                    <p className="smartmeter-header-text">Zählerstand: {lastvalue}</p>
                    <p className="smartmeter-header-text">Zählernummer: {smartmeter_id} </p>
                    <p className="smartmeter-header-text">Zählbeginn: {start} </p>
                    <hr style={{ borderWidth: "0%", borderColor: "black" }}></hr>
                    <p className="smartmeter-header-text">Stromzählerstandort</p>
                    <p className="smartmeter-header-text">Straße/Nr: {address} {house_number}</p>
                    <p className="smartmeter-header-text">PLZ/ORT: {post_code}</p>
                </div>
            </div>
        </div>
    )
}