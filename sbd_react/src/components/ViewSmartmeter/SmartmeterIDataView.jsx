import DropDown from "../usables/DropDown";

function DataParagraph({ heading, value }) {
  return (
    <div className="smartmeter-header-text">
      {heading}: {value}
    </div>
  );
}

export default function SmartmeterDataViews({
  smartmeterData,
  selectedSmartmeterId,
  onSelectedSmartMeterChange,
}) {
  let selectedSmartmeterData;
  const showData = smartmeterData.length !== 0;

  if (showData) {
    selectedSmartmeterData = smartmeterData.filter(
      (item) => item.id === selectedSmartmeterId
    )[0];
  }

  return (
    <div className="smartmeter-view">
      <div className="heading-smartmeter-data">
        <div className="heading-smartmeter-title">Smartmeter</div>
        <DropDown
          items={smartmeterData}
          onChangeSelection={onSelectedSmartMeterChange}
          selectedId={selectedSmartmeterId}
        />
      </div>
      <div className="smartmeter-data">
        <DataParagraph
          heading={"Zählenummer"}
          value={showData ? selectedSmartmeterData.id : ""}
        />
        <DataParagraph
          heading={"Zählbeginn"}
          value={showData ? selectedSmartmeterData.start : ""}
        />
        <DataParagraph
          heading={"Straße / Nr"}
          value={
            showData
              ? selectedSmartmeterData.address +
                " " +
                selectedSmartmeterData.house_number
              : ""
          }
        />
        <DataParagraph
          heading={"Plz"}
          value={showData ? selectedSmartmeterData.post_code : ""}
        />
      </div>
    </div>
  );
}
