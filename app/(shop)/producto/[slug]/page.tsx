//app/(shop)/producto/components/productoInfo.tsx
"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, RotateCcw, CreditCard, Truck, HeadphonesIcon } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { ProductoGallery } from "../components/productGallery";
import { ProductoInfo } from "../components/productInfo";
import { ProductBuyBox } from "../components/productBuyBox";

export default function ProductPage({ params }: { params: { slug: string } }) {
    
}