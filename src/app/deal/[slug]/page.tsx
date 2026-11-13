import NavbarNuevo from "@/componentes/NavbarNuevo/NavbarNuevo";
import Hero from "@/componentes/Hero/Hero";
import { connection } from "next/server";
import { getDealUseCase } from "@/infraestructure/container";
import Image from "next/image";

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
        <Image
          src={deal?.imageUrl || "/Products/Auriculares.png"}
          alt={deal?.slug || deal?.name || ""}
          width={200}
          height={200}
          className="card__image"
        />
        <h1>{deal.name}</h1>
      </div>
    </>
  );
}
