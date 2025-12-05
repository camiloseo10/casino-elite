// components/layout/ClientLayoutWrapper.tsx
'use client'; // ¡Este sí DEBE ser un Client Component!

import MainNavigation from "@/components/MainNavigation";
import CartDrawer from "@/components/cart/CartDrawer";
import React from "react"; // Importa React si no lo tienes ya

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      <CartDrawer />
      {children}
    </>
  );
}