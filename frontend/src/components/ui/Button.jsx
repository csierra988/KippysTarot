//shared button component
export default function Button({ children, className="", type="button", ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={`
                bg-control text-black 
                border-2 border-solid border-transparent outline-none rounded-control
                shadow-surface
                hover:border-accent hover:text-accent
                focus:border-accent
                ${className}
                `}
        >
            {children}
        </button>
    );
}