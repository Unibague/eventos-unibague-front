export function prepareErrorText (e) {
    let errorsAsText = '';
    console.log(e);
    let allErrors = e.response.data.errors;
    if (allErrors !== null) {
        for (let error in allErrors) {
            allErrors[error].forEach(function (errorDescription) {
                errorsAsText += errorDescription;
            })
        }
    }
    return `${e.response.data.message} ${errorsAsText}`;
}