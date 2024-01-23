import React from "react";

const Table = ({ measurements }) => {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const year = 2023; // Setze das gewünschte Jahr hier ein
  const cost = [
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
    0.25,
  ];

  const firstColumnValues = ["2023", "Verbrauch", "Kosten(Euro)"];
  const loadMeasurements = measurements.length !== 0;

  return (
    <table
      style={{
        borderCollapse: "collapse",
        width: "100%",
        height: "100%",
        marginTop: "5%",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>{firstColumnValues[0]}</th>
          {months.map((month, index) => (
            <th key={index} style={thMonthStyle}>
              {month}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={tdStyle}>{firstColumnValues[1]}</td>
          {loadMeasurements
            ? measurements.values.map((item, index) => (
                <td key={index} style={tdStyle}>
                  {item.value}
                </td>
              ))
            : null}
        </tr>
        <tr>
          <td style={tdStyle}>{firstColumnValues[2]}</td>
          {loadMeasurements
            ? measurements.values.map((item, index) => (
                <td key={index} style={tdStyle}>
                  {item.value === "-" ? "-" : item.value * cost[index]}
                </td>
              ))
            : null}
        </tr>
      </tbody>
    </table>
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
