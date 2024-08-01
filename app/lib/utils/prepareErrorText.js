export function prepareErrorText (e) {
    let errorsAsText = '';
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