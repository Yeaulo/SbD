import { React, useState, useEffect } from "react";
import "../../styles/Contracts/contracts.css";
import DropDown from "../usables/DropDown";
import ContractDataRow from "./ContractDataRow";

export default function Contracts() {
  const [smartmeter, setSmartmeter] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSmartmeterId, setSelectedSmartmeterId] = useState(1);

  function onSelectedSmartMeterChange(id) {
    setSelectedSmartmeterId(id);
    getContractData(id);
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/smartmeter/");
        const data = await response.json();
        let smartmeterList = [];
        data.data.map((item, index) => {
          smartmeterList.push({
            name: "Smartmeter " + (index + 1),
            id: item.smartmeter_id,
          });
        });
        setSmartmeter(smartmeterList);
        setSelectedSmartmeterId(smartmeterList[0].id);
        getContractData(smartmeterList[0].id);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();

    setIsLoading(false);
  }, []);

  function getContractData(smartmeter_id) {
    setIsLoading(true);
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

    setIsLoading(false);
  }
  console.log(contractData);
  return (
    <div className="contracts">
      <div className="outer-contracts">
        <div className="heading-contracts">
          <div className="heading-contracts-title">Contracts</div>
          <DropDown
            items={smartmeter}
            onChangeSelection={onSelectedSmartMeterChange}
            selectedId={selectedSmartmeterId}
          />
        </div>
        <div className="inner-contracts">
          <ContractDataRow
            propertyName={"Description"}
            value={contractData.description}
          />
          <ContractDataRow
            propertyName={"Price per Month"}
            value={contractData.price_per_month}
          />
          <ContractDataRow
            propertyName={"Start Date"}
            value={contractData.contract_start}
          />
          <ContractDataRow
            propertyName={"End Date"}
            value={contractData.contract_end}
          />
          <ContractDataRow
            propertyName={"Minimum Contract Duration"}
            value={contractData.minimum_term}
          />
          <ContractDataRow
            propertyName={"Notice Period"}
            value={contractData.notice_period}
          />
        </div>
      </div>
    </div>
  );
}
