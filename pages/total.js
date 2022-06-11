import { useEffect, useCallback } from "react";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function TotalPage() {


    const { pedido, nombre, setNombre, handleColocarOrder, total } = useQuiosco()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre.trim() === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(()=>{
        comprobarPedido()
    },[pedido, comprobarPedido])




    return (
        <Layout pagina="Total y Confirmar pedido">
            <h1 className="text-4xl font-black">Confirmar pedido</h1>
            <p className="text-2xl mt-5 mb-10">
                Confirma tu pedido  a continuación
            </p>

            <form onSubmit={handleColocarOrder}>
                <div>
                    <label
                        htmlFor="nombre" 
                        className="block uppercase font-bold text-slate-800 text-xl">Nombre:</label>
                    <input 
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={ ({target}) => setNombre( target.value ) }
                        className="bg-gray-200 w-full lg:w-4/12 mt-3 p-3 text-xl rounded-md" />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total al pagar <span className="font-bold">{ formatearDinero(total) }</span></p>
                </div>
                <div className="mt-5">
                    <input 
                        type="submit"
                        disabled={comprobarPedido()} 
                        className="bg-indigo-600 hover:bg-indigo-800 w-full lg:w-auto px-7 py-3 rounded uppercase font-bold text-white text-center cursor-pointer disabled:bg-indigo-300"
                        value="Confirmar pedido" />
                </div>
            </form>
        </Layout>
    )
}