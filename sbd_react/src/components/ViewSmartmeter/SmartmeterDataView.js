import DropDown from "../utils/DropDown";
import "../../styles/ViewSmartmeter/SmartmeterDataView.css";

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
      </div>
      <div className="smartmeter-data">
        <div className="smartmeter-data-container">
          <div className="smartmeter-data-paragraphs-container">
            <div className="smartmeter-data-paragraphs">
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
                      (selectedSmartmeterData.house_numnber
                        ? selectedSmartmeterData.house_number
                        : "")
                    : ""
                }
              />
              <DataParagraph
                heading={"Plz"}
                value={showData ? selectedSmartmeterData.post_code : ""}
              />
              <div className="horizontal-line"></div>
            </div>
          </div>
          <div className="smartmeter-dropdown">
            <DropDown
              items={smartmeterData}
              onChangeSelection={onSelectedSmartMeterChange}
              selectedId={selectedSmartmeterId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
