export default function ContractDataRow({ propertyName, value }) {
  return (
    <div className="property-row">
      <div className="property-name">{propertyName + ": "}</div>
      <div className="property-value">{value}</div>
    </div>
  );
}
