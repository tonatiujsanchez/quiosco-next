import { useRouter } from "next/router"
import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'

const Categoria = ({ categoria }) => {

    const router = useRouter()
    const { handleClickCategoria, categoriaActual } = useQuiosco()
    
    const { nombre, icono, id } = categoria

    return (
        <button
            type='button'
            className={`${ categoriaActual?.id === id ? 'bg-amber-400': null } hover:cursor-pointer flex items-center gap-4 w-full first:border-t border-b p-5 hover:bg-amber-400`}
            onClick={()=>{
                if( router.pathname !== '/' ){
                    router.push('/')
                }
                handleClickCategoria(id)
            }}>
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