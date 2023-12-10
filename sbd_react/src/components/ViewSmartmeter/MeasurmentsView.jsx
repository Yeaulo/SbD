import ContractDataView from "./ContractDataView";
import ImportantValues from "./ImportantValues";
import Table from "./Table";
import "../../styles/ViewSmartmeter/MeasurmentsView.css";

export default function MeasurementsView({ contractData, measurements }) {
  console.log(contractData);
  return (
    <div className="measurements-container">
      <div className="measurements-important-values-outer">
        <ImportantValues
          heading={"Zählerstand"}
          value={
            measurements.length !== 0 ? measurements.curr_val + "/kwH" : ""
          }
        />
        <ImportantValues
          heading={"Durchschnittlicher Verbrauch"}
          value={
            measurements.length !== 0 ? measurements.month_avg + "/kwH" : ""
          }
        />
      </div>
      <div className="measurements-table">
        <p className="smartmeter-header-text">Verbrauchsübersicht</p>
        <Table
          measurements={measurements.month_values}
          costsKwH={contractData.price_per_month}
        />
      </div>
      <ContractDataView contractData={contractData} />
    </div>
  );
}
