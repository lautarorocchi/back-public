
function createPage(content) {
    return `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Mi pagina web</title>
            </head>
            <body>
                <h1>Mi espectacular pagina web!</h1>
                ${content}
            </body>
        </html>
    `
}
const URL = 'http://localhost:3000'

export {
    createPage,
    URL
}


export default {
    createPage,
    pepe: URL
}