import ResumenProducto from "../components/ResumenProducto";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";

export default function ResumenPage() {

    const { pedido } = useQuiosco()

    return (
        <Layout pagina="Resumen del pedido">
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl mt-5 mb-10">
                Revisa tu pedido
            </p>
            { pedido.length <= 0 
                ? <div>
                    <p className="text-center text-2xl">No has agregado nada a tu pedido</p>
                </div>
                : <div>
                    { pedido.map( producto => (
                         <ResumenProducto key={producto.id} producto={producto} />
                     ))
                    }
                </div>

            }
        </Layout>
    )
}