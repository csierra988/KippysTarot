//shared textinput component
export default function TextInput({ className = '', ...props }) {
    return (
        <input
            // passes props to actual input
            {...props}
            className={`
                h-[30px] w-[400px] m-[10px] p-[4px]
                bg-white caret-black text-black outline-none 
                border-2 border-solid border-transparent rounded-control
                focus:border-accent
                placeholder:font-pixel
                ${className}`}
        />
    );
}