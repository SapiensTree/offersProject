import { connection } from "next/server";
import NavbarNuevo from "@/componentes/NavbarNuevo/NavbarNuevo";
import Hero from "@/componentes/Hero/Hero";
import Filters from "@/componentes/Filters/Filters";
import ContainerCards from "@/componentes/ContainerCards/ContainerCards";
import { getCatalogDealUseCase } from "@/infraestructure/container";

export const instant = false;

export default async function HomePage() {
  await connection();

  const { deals, categories } = await getCatalogDealUseCase.execute();
  //const activeCampaign = getActiveCampaign(new Date());

  return (
    <>
      <NavbarNuevo />
      <Hero />
      <Filters />
      <ContainerCards deals={deals} />
    </>

    /*<div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300">
      <div className="theme-decorations" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <DealsPage deals={deals} categories={categories} campaign={activeCampaign} />
    </div>*/
  );
}
