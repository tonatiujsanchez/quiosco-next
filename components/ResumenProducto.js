import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const ResumenProducto = ({ producto }) => {


    const { handleEditarCantidades, handleEliminarProducto } = useQuiosco()

    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-3/12">
                <Image
                    width={500}
                    height={600}
                    alt={`Imagen preducto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`} />
            </div>
            <div className='md:w-7/12'>
                <h3 className='text-3xl font-bold mb-2'>{producto.nombre}</h3>
                <p className='text-xl font-bold mb-2'>Cantidad: {producto.cantidad}</p>
                <p className='text-xl font-bold text-amber-500 mb-2'>precio: {formatearDinero(producto.precio)}</p>
                <p className='text-gray-700 font-semibold'>Subtotal: {formatearDinero(producto.precio * producto.cantidad)}</p>
            </div>
            <div className='md:w-2/12'>
                <button
                    type='button'
                    onClick={()=>{handleEditarCantidades(producto.id)}}
                    className='bg-sky-700 px-5 py-2 text-white rounded-sm font-bold uppercase w-full shadow-md mb-3 flex justify-center gap-2'>

                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                </button>
                <button
                    type='button'
                    onClick={()=> handleEliminarProducto(producto.id)}
                    className='bg-red-700 px-5 py-2 text-white rounded-sm font-bold uppercase w-full shadow-md flex justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default ResumenProducto