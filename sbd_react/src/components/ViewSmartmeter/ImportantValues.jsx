import "../../styles/ViewSmartmeter/ImportantValues.css";

export default function ImportantValues({ heading, value }) {
  return (
    <div className="measurements-important-values">
      <p className="important-value-header">{heading}</p>
      <p className="important-values">{value}</p>
    </div>
  );
}
