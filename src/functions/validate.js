import { useForm, useValidateField, useFieldValue  } from 'vee-validate';

var setErrorsLoader;

export const initializeValidator = () => {
    let { setFieldError } = useForm();
    setErrorsLoader = setFieldError;
}

export const setValidators = (fields) => {
    let validate = [];
    let value = [];
    for(let i =0; fields.length>i; i++){
        validate[i] = useValidateField(fields[i])
        value[i] = useFieldValue(fields[i])
    }
    return {
        fields,
        validate,
        value,
    }
}

export const validate = async (data) => {
    var status = true;
    let values = {};
    for(let i =0; data.fields.length>i; i++){
        let fieldStatus = await data.validate[i]();
        if(fieldStatus.valid === false){
            status = false;
        }
        if(!data.fields[i].includes('@checker')){
            values[data.fields[i]] = data.value[i].value;
        }
    }
    return {
        status,
        values,
    }
}
export const setErrors = async (errors) => {
    for(let key in errors){
        setErrorsLoader(key, errors[key][0])
    }    
}