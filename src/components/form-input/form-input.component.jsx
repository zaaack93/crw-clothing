import './form-input.Styles.scss';

const FormInput = ({displayName, ...otherProps}) =>{

    return (
        <div className="group">
        <input {...otherProps} className="form-input"/>
        { displayName && (
            <label className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}>{displayName}</label>
        )}
        </div>
    )
}

export default FormInput;