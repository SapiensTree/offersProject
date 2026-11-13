"use client";
import "./ContainerCards.scss";
import Card from "../Card/Card";
import { PublicDeal } from "@/core/domain/deal";
import { useEffect } from "react";

export default function ContainerCards({
  deals,
}: {
  deals: PublicDeal[] | null;
}) {
  useEffect(() => {
    console.log(deals);
  }, [deals]);

  return (
    <div className="container-cards">
      {deals?.map((deals) => {
        return <Card deal={deals} key={deals.id} />;
      })}
    </div>
  );
}
