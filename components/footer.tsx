import Link from "next/link"
import { Monitor, Mail, Phone, MapPin } from "lucide-react"
import { t } from "@/lib/translations"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">{t("nav.storeName")}</span>
            </Link>
            <p className="text-muted-foreground">{t("footer.description")}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.shop")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.cart")}
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Көмекшісі
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("footer.categories")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop?category=processors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("categories.processors")}
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=graphics"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t("categories.graphics")}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=mice" className="text-muted-foreground hover:text-primary transition-colors">
                  Ойын тышқандары
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=keyboards"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Пернетақталар
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t("footer.contact")}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {t("footer.email")}: support@deviceshop.kz
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {t("footer.phone")}: +7 (727) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {t("footer.address")}: Алматы қ., Абай даңғылы 150
              </li>
            </ul>
            <div className="text-sm text-muted-foreground">
              <p>{t("footer.workingHours")}:</p>
              <p>
                {t("footer.monday")} - {t("footer.sunday")}: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Device Shop. {t("footer.allRights")}.</p>
        </div>
      </div>
    </footer>
  )
}
