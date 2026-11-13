"use client";
import "./Card.scss";
import Image from "next/image";
import { PublicDeal } from "@/core/domain/deal";
import { useEffect } from "react";
import Link from "next/link";

export default function Card({ deal }: { deal: PublicDeal | null }) {
  useEffect(() => {
    console.log(deal);
  }, [deal]);

  return (
    <>
      <Link href={`/deal/${deal?.slug}`} className="card">
        <div className="card__container-image">
          <div className="card__badge">{`${deal?.discountPercentage}%`}</div>
          <Image
            src={deal?.imageUrl || "/Products/Auriculares.png"}
            alt={deal?.slug || deal?.name || ""}
            width={200}
            height={200}
            className="card__image"
          />
        </div>
        <div className="card__container-info">
          <h3 className="card__title">{deal?.name}</h3>
          <div className="card__container-price">
            <p className="card__price">{deal?.priceWithDiscount}€</p>
            <p className="card__price-discount">{deal?.price}€</p>
          </div>
          <p className="card__description">{deal?.description}</p>
          <button className="card__button">Ir a la oferta</button>
        </div>
      </Link>
    </>
  );
}
