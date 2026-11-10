"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import DealsCatalog from "./DealsCatalog";
import AuthModal from "./AuthModal";
import { useAuthUser } from "@/lib/use-auth-user";
import { getPublicClient } from "@/lib/pocketbase-client";
import { PublicDeal } from "@/core/domain/deal";
import { Category } from "@/core/domain/category";
import { Campaign } from "@/config/campaigns";

type AuthMode = "login" | "register";

export default function DealsPage({
  deals,
  categories,
  campaign,
}: {
  deals: PublicDeal[];
  categories: Category[];
  campaign: Campaign | null;
}) {
  const user = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);

  const featuredCount = deals.filter((d) => d.isFeatured).length;

  const handleLogout = () => {
    getPublicClient().authStore.clear();
  };

  return (
    <>
      <Navbar
        campaign={campaign}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAuth={setAuthMode}
        onLogout={handleLogout}
      />

      <Hero
        campaign={campaign}
        dealCount={deals.length}
        categoryCount={categories.length}
        featuredCount={featuredCount}
      />

      <main className="relative z-10 max-w-3xl mx-auto py-10 px-6">
        <div id="ofertas" className="scroll-mt-24">
          <h2 className="text-xl font-bold mb-5 text-[var(--text-main)]">
            Ofertas de hoy
          </h2>
          <DealsCatalog deals={deals} categories={categories} searchQuery={searchQuery} />
        </div>
      </main>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSwitchMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
        />
      )}
    </>
  );
}
