"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, Cpu, Monitor, Mouse } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/translations"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                {t("hero.title").split(" ").slice(0, 2).join(" ")}
                <span className="text-primary block">{t("hero.title").split(" ").slice(2).join(" ")}</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-lg">{t("hero.subtitle")}</p>
            </div>

            {/* Search Bar */}
            <div className="flex max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder={t("hero.searchPlaceholder")} className="pl-10 pr-4 py-3 text-base" />
              </div>
              <Button className="ml-2 px-6">Іздеу</Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("hero.shopNow")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  {t("hero.learnMore")}
                </Button>
              </Link>
            </div>

            {/* Quick Categories */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop?category=processors">
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4" />
                  {t("hero.categories.processors")}
                </Button>
              </Link>
              <Link href="/shop?category=graphics">
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4" />
                  {t("hero.categories.graphics")}
                </Button>
              </Link>
              <Link href="/shop?category=peripherals">
                <Button variant="ghost" className="flex items-center gap-2 text-sm">
                  <Mouse className="h-4 w-4" />
                  {t("hero.categories.peripherals")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8 backdrop-blur-sm border border-border/50">
              <img
                src="/modern-computer-setup-with-rgb-lighting-and-high-e.jpg"
                alt="Премиум компьютерлік жүйе"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              {t("hero.badges.premium")}
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
              {t("hero.badges.shipping")}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
