import React, { useState, useEffect } from "react";
import "../../styles/ViewSmartmeter/smartmeter.css";
import MeasurementsView from "./MeasurmentsView";
// import Table from "./Table";

// import MeasurementsView from "./MeasurmentsView";
import SmartmeterDataViews from "./SmartmeterDataView";
import Cookies from "js-cookie";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://dhbwsbd.pythonanywhere.com/api/smartmeter/";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
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
        const url =
          "https://dhbwsbd.pythonanywhere.com/measurements/" +
          smartmeter_id +
          "/";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        const data = await response.json();
        setMeasurements(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }

  function getContractData(smartmeter_id) {
    const fetchData = async () => {
      try {
        const url =
          "https://dhbwsbd.pythonanywhere.com/api/contractData/" +
          smartmeter_id +
          "/";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        });
        const data = await response.json();
        setContractData(data.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }

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
