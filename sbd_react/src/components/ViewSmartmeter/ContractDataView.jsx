export default function ContractDataView({ contractData }) {
  return (
    <div className="smartmeter-contract-data">
      <div className="smartmeter-header-text">
        Vertragsdaten:
        <div
          style={{
            display: "flex",
            justifyContent: "space between",
            gap: "30%",
            marginTop: "1%",
          }}
        >
          <div className="group1">
            <div className="smartmeter-header-text">
              Vertragsname: {contractData.description}
            </div>
            <div className="smartmeter-header-text">
              Preis: {contractData.price_per_month}€ pro kwh
            </div>
          </div>
          <div className="group2">
            <div className="smartmeter-header-text">
              Mindestlaufzeit: {contractData.minimum_term}
            </div>
            <div className="smartmeter-header-text">
              Kündigungsfrist: {contractData.notice_period}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
