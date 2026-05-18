"use client"
function InputField(props) {
    return (
       <input
       className="w-[300px] bg-purpule-300 p-2 rounded-[30px]"
       placeholder={props.placeholder}
       type={props.type}
       onChange={(e)=>{
        props.inputValue(e.target.value);
       }}
       
       />
    )
}

export default InputField
