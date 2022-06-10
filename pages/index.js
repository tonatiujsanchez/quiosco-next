import Producto from "../components/Producto";
import useQuiosco from "../hooks/useQuiosco";
import Layout from "../layout/Layout";


export default function HomePage() {
    
    const { categoriaActual } = useQuiosco()

    return (
        <Layout pagina={`Menú de ${Object.keys(categoriaActual).length > 0 ? categoriaActual.nombre : 'Quiosco'}`}>
            <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
            <p className="text-2xl mt-5 mb-10">
                Elige y personaliza tu pedido a continuación
            </p>
            <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    categoriaActual?.productos?.map(producto => (
                        <Producto key={producto.id} producto={producto} />
                    ))
                }
            </section>
        </Layout>
    )
}
