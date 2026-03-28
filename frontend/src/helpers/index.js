export const FormatearMoneda = price =>
    Number(price).toLocaleString('es-GT',{
        style:'currency',
        currency: 'GTQ'
    })
