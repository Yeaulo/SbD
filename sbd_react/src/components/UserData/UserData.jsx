import InputUserData from "./InputUserData"

export default function UserData(){
    return (
        <div className="outer-user-data"> 
            Nutzerdaten
            <div className="inner-user-data">
                <InputUserData propertyName="Vorname" value="Max" />
                <InputUserData propertyName="Nachname" value="Mustermann" />
                <InputUserData propertyName="E-Mail" value=""/>
            </div>
        </div>
    )
}