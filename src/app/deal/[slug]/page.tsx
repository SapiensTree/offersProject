import NavbarNuevo from "@/componentes/NavbarNuevo/NavbarNuevo";
import Hero from "@/componentes/Hero/Hero";
import { connection } from "next/server";
import { getDealUseCase } from "@/infraestructure/container";

export default async function DealPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connection();

  const { slug } = await params;

  const deal = await getDealUseCase.execute(slug);

  if (!deal) {
    return (
      <>
        <NavbarNuevo />
        <main style={{ padding: "2rem", textAlign: "center", color: "white" }}>
          <h2>Oferta no encontrada</h2>
        </main>
      </>
    );
  }
  return (
    <>
      <NavbarNuevo />
      <Hero />
      <div style={{ color: "white", padding: "2rem" }}>
        <h1>{deal.name}</h1>
      </div>
    </>
  );
}
