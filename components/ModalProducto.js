import Image from 'next/image'
import { useState, useEffect } from 'react'

import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const ModalProducto = () => {

    const [cantidad, setCantidad] = useState(1)
    const [agregado, setAgregado] = useState(false)

    const { producto, handleChangeModal, handleAgregarPedido, pedido } = useQuiosco()
    const { nombre, imagen, precio } = producto


    // comprobar si el modal actual esta en el pedido
    useEffect(() => {
        if (pedido.some(p => p.id === producto.id)) {
            const productoExistente = pedido.find(p => p.id === producto.id)
            setAgregado(true)
            setCantidad(productoExistente.cantidad)
        }
    }, [producto, pedido])



    return (
        <div className="md:flex gap-10 max-w-[800px]">
            <div className="md:w-1/3">
                <Image
                    width={500}
                    height={600}
                    src={`/assets/img/${imagen}.jpg`}
                    alt={`Fotos de ${nombre}`} />
            </div>
            <div className="md:w-2/3">
                <div className='flex justify-end'>
                    <button onClick={handleChangeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <h1 className='text-3xl font-bold'>{nombre}</h1>
                <p className='mt-5 font-black text-5xl text-amber-500'>{formatearDinero(precio)}</p>
                <div className='flex gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className='text-3xl'>{cantidad}</p>
                    <button
                        type='button'
                        onClick={() => {
                            if (cantidad >= 9) return
                            setCantidad(cantidad + 1)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <button
                    type='button'
                    onClick={() => handleAgregarPedido({ ...producto, cantidad })}
                    className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded-sm' >
                    { agregado ? 'Guardar cambios' : 'Añadir al pedido' }
                </button>
            </div>
        </div>
    )
}

export default ModalProducto