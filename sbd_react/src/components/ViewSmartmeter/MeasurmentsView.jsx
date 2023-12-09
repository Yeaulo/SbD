import ContractDataView from "./ContractDataView";
import ImportantValues from "./ImportantValues";
import Table from "./Table";
import "../../styles/ViewSmartmeter/MeasurmentsView.css";

export default function MeasurementsView({ contractData, measurements }) {
  return (
    <div className="measurements-container">
      <div className="measurements-important-values-outer">
        <ImportantValues
          heading={"Zählerstand"}
          value={
            measurements.length !== 0
              ? measurements.lastvalue.value + "/kwH"
              : ""
          }
        />
        <ImportantValues
          heading={"Durchschnittlicher Verbrauch"}
          value={"104/kwH"}
        />
      </div>
      <div className="measurements-table">
        <p className="smartmeter-header-text">Verbrauchsübersicht</p>
        <Table measurements={measurements} />
      </div>
      <ContractDataView contractData={contractData} />
    </div>
  );
}
