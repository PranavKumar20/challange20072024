const SPButton1 = ({label,onClick})=>{
    return (
        <div className="flex flex-row cursor-pointer" onClick={onClick} >
        <div>{label}</div>
        </div>
    )
}

export default SPButton1;