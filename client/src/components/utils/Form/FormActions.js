function validate(element, formData=[]) {
    let error = [true,''];

    if (element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    return error;
}

function update(element, formData, formName){
    const newFormData = {...formData};

    const newElement = {...newFormData[element.id]}

    newElement.value = element.event.target.value;

    if(element.blur){
        let isValidData = validate(newElement, formData);
        newElement.valid = isValidData[0];
        newElement.validationMessage = isValidData[1];
    }

    newElement.toched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
}

function generateData(formData, formName){
    let dataToSubmit = {}

    for(let key in formData){
        dataToSubmit[key] = formData[key].value;
    }

    return dataToSubmit;
}

function isFormValid(formData, formName){
    let formIsValid = true;

    for(let key in formData){
        formIsValid = formData[key].valid && formIsValid
    }

    return formIsValid;
}

export {update, validate, generateData, isFormValid}