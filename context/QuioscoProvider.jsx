import { createContext, useEffect, useState } from "react"
import axios from "axios"


const QuioscoContext = createContext()


const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
        setCategoriaActual(data[0])
    }

    useEffect(()=> {
        obtenerCategorias()
    },[])


    const handleClickCategoria = (id) => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
    }

    const handleSetProducto = ( producto ) => {
        setProducto(producto)
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto
            }} >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext