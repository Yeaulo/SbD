import ContractDataView from "./ContractDataView";
import ImportantValues from "./ImportangValues";
import Table from "./Table";

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
        <Table measurements={measurements} />
      </div>
      <ContractDataView contractData={contractData} />
    </div>
  );
}
