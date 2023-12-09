import React, { useState, useEffect } from "react";
import "../../styles/ViewSmarter/smartmeter.css";
import MeasurementsView from "./MeasurmentsView";
// import Table from "./Table";

// import MeasurementsView from "./MeasurmentsView";
import SmartmeterDataViews from "./SmartmeterIDataView";

export default function ViewSmartmeter() {
  const [measurements, setMeasurements] = useState([]);
  const [contractData, setContractData] = useState([]);
  // const [lastvalue, setLastvalue] = useState(0);
  // const [average, setaverage] = useState(0);
  const [selectedSmartmeterId, setSelectedSmartmeterId] = useState(1);
  const [smartmeterData, setSmartmeterData] = useState([]);

  function onSelectedSmartMeterChange(id) {
    setSelectedSmartmeterId(id);
    getContractData(id);
    getMeasurements(id);
  }

  // function avarageValue(smartmeterList) {
  //   let sum = 0;
  //   smartmeterList.map((item, index) => {
  //     sum += item.value;
  //   });
  //   return sum / smartmeterList.length;
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/smarterAll/");
        const data = await response.json();
        let smartmeterData = [];
        data.data.map((item, index) => {
          smartmeterData.push({
            name: "Smartmeter " + (index + 1),
            id: item.smartmeter_id,
            start: item.contract_start,
            address: item.address,
            house_number: item.house_number,
            post_code: item.post_code,
          });
        });

        setSmartmeterData(smartmeterData);
        setSelectedSmartmeterId(smartmeterData[0].id);
        getContractData(smartmeterData[0].id);
        getMeasurements(smartmeterData[0].id);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  function getMeasurements(smartmeter_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/measurements/" + smartmeter_id + "/"
        );
        const data = await response.json();
        let smartmeterListMeasurments = [];
        data.data.map((item, index) => {
          smartmeterListMeasurments.push(item);
        });

        const measurements = {
          values: smartmeterListMeasurments,
          lastvalue:
            smartmeterListMeasurments[smartmeterListMeasurments.length - 1],
        };
        setMeasurements(measurements);
        // const valuelist = [
        //   ...smartmeterListMeasurments,
        //   ...Array(12 - smartmeterListMeasurments.length).fill({ value: "-" }),
        // ];
        // const average = avarageValue(smartmeterListMeasurments);
        // setaverage(average);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }

  function getContractData(smartmeter_id) {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/contractData/" + smartmeter_id + "/"
        );
        const data = await response.json();
        setContractData(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }

  //

  return (
    <div className="smartmeter-container">
      <MeasurementsView
        contractData={contractData}
        measurements={measurements}
      />
      <SmartmeterDataViews
        smartmeterData={smartmeterData}
        selectedSmartmeterId={selectedSmartmeterId}
        onSelectedSmartMeterChange={onSelectedSmartMeterChange}
      />
    </div>
  );
}
