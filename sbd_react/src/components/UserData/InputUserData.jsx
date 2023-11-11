export default function InputUserData({showName, propertyName, value, onChange, isLoading}){
    return (
        <div className="input-label">
            {showName}
            <input type="text" name={propertyName} value={value} onChange={onChange} disabled={isLoading}/>
        </div>
    )
}