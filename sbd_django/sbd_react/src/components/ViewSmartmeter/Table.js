import React from "react";
import "../../styles/ViewSmartmeter/Table.css";

const months = {
  1: "Januar",
  2: "Februar",
  3: "März",
  4: "April",
  5: "Mai",
  6: "Juni",
  7: "Juli",
  8: "August",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Dezember",
};
const Table = ({ measurements, costsKwH }) => {
  function getMonthOrder(first_value) {
    const liste = Array.from(
      { length: 12 },
      (_, index) => ((first_value + index) % 12) + 1
    );
    return liste;
  }

  const firstMonth = measurements
    ? parseInt(Object.keys(measurements)[Object.keys(measurements).length - 1])
    : 0;

  const monthOrder = getMonthOrder(firstMonth);

  const firstColumnValues = ["", "Verbrauch", "Kosten(Euro)"];
  return (
    <div style={{ width: "100%", height: "70%", overflowY: "auto" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          height: "100%",
          marginTop: "0%",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>{firstColumnValues[0]}</th>
            {measurements
              ? monthOrder.map((index, value) => (
                  <th key={index} style={thMonthStyle}>
                    {months[index]}
                  </th>
                ))
              : null}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{firstColumnValues[1]}</td>
            {measurements
              ? monthOrder.map((index, value) => (
                  <td key={index} style={tdStyle}>
                    {measurements[index] ? measurements[index] : "-"}
                  </td>
                ))
              : null}
          </tr>
          <tr>
            <td style={tdStyle}>{firstColumnValues[2]}</td>
            {measurements
              ? monthOrder.map((index, value) => (
                  <td key={index} style={tdStyle}>
                    {measurements[index]
                      ? (measurements[index] * costsKwH).toFixed(2)
                      : "-"}
                  </td>
                ))
              : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#f2f2f2",
};

const thMonthStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
  backgroundColor: "#f2f2f2",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default Table;
