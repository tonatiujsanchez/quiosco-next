import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

const QuioscoContext = createContext()


const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [paso, setPaso] = useState(1)

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

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ( { imagen, categoriaId, ...producto} ) => {

        const existeProducto = pedido.some( p => p.id === producto.id ) 

        if( existeProducto ){
            const pedidoActualizado = pedido.map( p => p.id === producto.id ? producto : p )
            setPedido(pedidoActualizado)
            toast.success('Guardado correctamente', {
                position: "top-right",
                autoClose: 1000,
            });
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido', {
                position: "top-right",
                autoClose: 1000,
                });
        }

        setModal(false)

    }

    const handleChangePaso = ( paso ) => {
        setPaso(paso)
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedido,
                pedido,
                handleChangePaso,
                paso
            }} >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext