import { useRouter } from "next/router"
import useQuiosco from "../hooks/useQuiosco"



const pasos = [
    { paso: 1, nombre: 'Menú', url: '/' },
    { paso: 2, nombre: 'Resumen', url: '/resumen' },
    { paso: 3, nombre: 'Datos y Total', url: '/total' },
]

const Progreso = () => {

    const router = useRouter()
    const { handleChangePaso, paso } = useQuiosco()

    const calcularProgeso = () => {

        switch (paso) {
            case 1:
                return 25;
            case 2:
                return 60;
            case 3:
                return 100;
            default:
                return 100;
        }
    }

    return (
        <>
            <div className="flex justify-between gap-4 mb-5">
                {
                    pasos.map(paso => (
                        <button
                            key={paso.paso}
                            onClick={() => { 
                                router.push(paso.url)
                                handleChangePaso(paso.paso) 
                            }}
                            className="text-2xl font-bold uppercase flex-1 flex items-center justify-around gap-2" >
                            {paso.nombre}
                            {paso.paso !== 3 &&
                                <span className="opacity-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </span>
                            }
                        </button>
                    ))
                }
            </div>
            <div className="bg-slate-200 mb-10">
                <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
                    style={{ width: `${calcularProgeso()}%` }}>

                </div>
            </div>
        </>
    )
}

export default Progreso