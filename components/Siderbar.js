import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria";

const Siderbar = () => {

    const { categorias } = useQuiosco()

    return (
        <div className="border-r h-screen">
            <div className="p-5 mb-3">
                <Image
                    width={300}
                    height={100}
                    src="/assets/img/logo.svg"
                    alt="Logo Quiosco Cafetería"/>
            </div>
            
            <nav>
                { categorias.map( categoria => (
                    <Categoria key={categoria.id} categoria={categoria} />
                ))
                }
            </nav>
        </div>
    )
}

export default Siderbar