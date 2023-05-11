// Potong deskripsi 
function potongDeskripsi(string, length) {
    let result = ""

    if (string=="" || string==null) {
        result = ""
    } else if (string.length > length) {
        result = string.substr(0, length) + "...";
    } else {
        result = string;
    }

    return result
}

module.exports = {potongDeskripsi}