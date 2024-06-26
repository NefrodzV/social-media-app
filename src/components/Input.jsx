import Proptypes from 'prop-types'
export default function Input({
    type,
    placeholder,
    label,
    name,
    hasError,
    className,
}) {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input
                className={`${className} ${hasError ? 'error' : ''}`}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
            />
        </>
    )
}
Input.propTypes = {
    type: Proptypes.string,
    placeholder: Proptypes.string,
    name: Proptypes.string,
    label: Proptypes.string,
}
