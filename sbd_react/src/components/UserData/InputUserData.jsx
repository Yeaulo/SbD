export default function InputUserData({propertyName, value, onChange}){
    return (
        <div>
            {propertyName}
            <input type="text" value={value} onChange={onChange}/>
        </div>
    )
}