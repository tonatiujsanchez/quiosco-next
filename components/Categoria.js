import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ({ categoria }) => {

    const { nombre, icono, id } = categoria
    const { handleClickCategoria, categoriaActual } = useQuiosco()


    return (
        <button
            type='button'
            className={`${ categoriaActual?.id === id ? 'bg-amber-400': null } hover:cursor-pointer flex items-center gap-4 w-full first:border-t border-b p-5 hover:bg-amber-400`}
            onClick={()=>handleClickCategoria(id)}>
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt={`Icono de ${nombre}`} />
            <span className='text-2xl font-bold '>{nombre}</span>
        </button>
    )
}

export default Categoria