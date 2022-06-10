import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Producto = ({ producto }) => {

    const { handleSetProducto, handleChangeModal } = useQuiosco()

    const { nombre, imagen, precio } = producto


    return (
        <article className="border p-3">
            <Image
                width={500}
                height={600}
                src={`/assets/img/${imagen}.jpg`}
                alt={`Foto de ${ nombre }`} />
                <div className='p-5'>
                    <h3 className='text-2xl font-bold'>{ nombre }</h3>
                    <p className='mt-5 font-black text-4xl text-amber-500'>
                        { formatearDinero(precio) }
                    </p>
                    <button 
                        onClick={()=>{
                            handleSetProducto(producto)
                            handleChangeModal()
                        }}
                        type='button'
                        className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 p-3 uppercase font-bold w-full'>
                        Agregar
                    </button>
                </div>
        </article>
    )
}

export default Producto