"use client";
import "./ContainerCards.scss";
import Card from "../Card/Card";
import { PublicDeal } from "@/core/domain/deal";
import { Fragment, useEffect } from "react";
import AdCard from "../AdCard/AdCard";

export default function ContainerCards({
  deals,
}: {
  deals: PublicDeal[] | null;
}) {
  const AD_EVERY = 6;

  useEffect(() => {
    console.log(deals);
  }, [deals]);

  return (
    <div className="container-cards">
      {deals?.map((deal, index) => {
        const showAd = (index + 1) % AD_EVERY === 0;
        const adCount = Math.floor((index + 1) / AD_EVERY);
        const channel = adCount % 2 === 1 ? "whatsapp" : "telegram";

        return (
          <Fragment key={deal.id}>
            <Card deal={deal} />
            {showAd && (
              <AdCard key={`ad-${index}`} adSlot="" channel={channel} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
