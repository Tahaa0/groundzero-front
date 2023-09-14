
const extractCoord = (url) => {
    if (url.startsWith('http')) {
        return url.split("@")[1].split(',').map(Number).slice(0,2).reverse()
    }
    return url.split(',').map(Number).reverse()
}

export { extractCoord }