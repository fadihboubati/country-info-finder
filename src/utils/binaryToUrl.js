
function binaryToUrl(binary) {
    //Convert the binary into an array of binary strings separated by whitespace.
    binary = binary.split(' ');

    //convert from binary to decimals, then to characters. 
    let url = binary.map(elem => String.fromCharCode(parseInt(elem, 2))).join('');

    // Reverse the string
    let apiUrl = url.split('').reverse().join('');

    return apiUrl;
}

module.exports = {
    binaryToUrl,
};

