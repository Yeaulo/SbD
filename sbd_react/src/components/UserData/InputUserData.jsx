export default function InputUserData({propertyName, value}){
    return (
        <div>
            {propertyName}
            <input type="text" value={value} readOnly/>
        </div>
    )
}