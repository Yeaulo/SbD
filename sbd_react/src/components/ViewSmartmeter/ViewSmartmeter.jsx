import React, { useState, useEffect } from "react";
import "../../styles/ViewSmarter/smartmeter.css";
import DropDown from "../usables/DropDown";

export default function ViewSmartmeter() {
    return (
        <div className="smartmeter-container">
            <div className="smartmeter-outer-left">
                <div className="smartmeter-inner-left_top_left">
                    <p>Verbrauch in diesem Monat</p>
                    </div>
                <div className="smartmeter-inner-left_top_right">
                    <p>Durchschnittlicher Verbrauch</p>
                </div>
                <div className="smartmeter-inner-left_middle">
                <p>Verbrauchsübersicht</p>
                </div>
                <div className="smartmeter-inner-left_bottom">
                <p>Vertragsdaten:</p>
                </div>
            </div>
            <div className="smartmeter-outer-right">
                <div className="smartmeter-header">
                    <p className="smartmeter-heading-right-title">Stromzählerinformationen</p>
                    </div>
                    <div className="smartmeter-inner-right">

                    </div>
            </div>

        </div>
    )
}