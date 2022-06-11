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
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
        setCategoriaActual(data[0])
    }

    useEffect(()=> {
        obtenerCategorias()
    },[])

    useEffect(()=>{
        const totalTemp = pedido.reduce( (total, producto) => {
            return (producto.precio * producto.cantidad) + total
        }, 0)
        setTotal(totalTemp)
    },[pedido])


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

    const handleAgregarPedido = ( { categoriaId, ...producto} ) => {

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

    const handleEditarCantidades = (id) => {
        const productoEditar = pedido.find( p => p.id === id )
        setProducto(productoEditar)
        setModal(true)
    }

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id )
        setPedido( pedidoActualizado )
        toast.success('Prducto eliminado del pedido', {
            position: "top-right",
            autoClose: 1000,
            });
    }
 
    const handleColocarOrder = (e) => {
        e.preventDefault()
        console.log('Enviando Orden...');
        console.log(pedido);
        console.log(nombre);
        console.log(total);
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
                handleEditarCantidades,
                handleEliminarProducto,
                setNombre,
                nombre,
                handleColocarOrder,
                total
            }} >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext