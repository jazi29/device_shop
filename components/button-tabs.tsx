"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Heart,
  Search,
  Filter,
  Grid,
  List,
  User,
  Settings,
  Home,
  Phone,
  Mail,
  Share2,
  Download,
  Upload,
  Edit,
  Trash2,
  Plus,
  Minus,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { t } from "@/lib/translations"

const buttonCategories = {
  shopping: {
    title: t("buttons.categories.shopping"),
    buttons: [
      { id: "add-to-cart", label: t("buttons.labels.addToCart"), icon: ShoppingCart, variant: "default" as const },
      { id: "add-to-favorites", label: t("buttons.labels.addToFavorites"), icon: Heart, variant: "outline" as const },
      { id: "buy-now", label: t("buttons.labels.buyNow"), icon: ShoppingCart, variant: "destructive" as const },
    ],
  },
  navigation: {
    title: t("buttons.categories.navigation"),
    buttons: [
      { id: "home", label: t("buttons.labels.home"), icon: Home, variant: "ghost" as const },
      { id: "search", label: t("buttons.labels.search"), icon: Search, variant: "outline" as const },
      { id: "filter", label: t("buttons.labels.filter"), icon: Filter, variant: "secondary" as const },
      { id: "grid-view", label: t("buttons.labels.gridView"), icon: Grid, variant: "outline" as const },
      { id: "list-view", label: t("buttons.labels.listView"), icon: List, variant: "outline" as const },
    ],
  },
  user: {
    title: t("buttons.categories.user"),
    buttons: [
      { id: "profile", label: t("buttons.labels.profile"), icon: User, variant: "ghost" as const },
      { id: "settings", label: t("buttons.labels.settings"), icon: Settings, variant: "outline" as const },
      { id: "contact", label: t("buttons.labels.contact"), icon: Phone, variant: "secondary" as const },
      { id: "email", label: t("buttons.labels.email"), icon: Mail, variant: "outline" as const },
    ],
  },
  actions: {
    title: t("buttons.categories.actions"),
    buttons: [
      { id: "share", label: t("buttons.labels.share"), icon: Share2, variant: "outline" as const },
      { id: "download", label: t("buttons.labels.download"), icon: Download, variant: "secondary" as const },
      { id: "upload", label: t("buttons.labels.upload"), icon: Upload, variant: "outline" as const },
      { id: "edit", label: t("buttons.labels.edit"), icon: Edit, variant: "ghost" as const },
      { id: "delete", label: t("buttons.labels.delete"), icon: Trash2, variant: "destructive" as const },
      { id: "add", label: t("buttons.labels.add"), icon: Plus, variant: "default" as const },
      { id: "remove", label: t("buttons.labels.remove"), icon: Minus, variant: "outline" as const },
    ],
  },
}

export function ButtonTabs() {
  const [activeButtons, setActiveButtons] = useState<string[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  const { dispatch } = useCart()

  const handleButtonClick = (buttonId: string, label: string) => {
    if (buttonId === "add-to-cart") {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: "demo-product-" + Date.now(),
          name: "Демо өнім - " + label,
          price: 10000,
          image: "/placeholder.svg",
          category: "demo",
        },
      })

      // Хабарландыру қосу
      const newNotification = `${label} - ${t("common.success")}`
      setNotifications((prev) => [...prev.slice(-2), newNotification])

      // 3 секундтан кейін хабарландыруды жою
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n !== newNotification))
      }, 3000)
    }

    // Активті түймелерді басқару
    if (activeButtons.includes(buttonId)) {
      setActiveButtons(activeButtons.filter((id) => id !== buttonId))
    } else {
      setActiveButtons([...activeButtons, buttonId])
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("buttons.title")}</h2>
        <p className="text-muted-foreground">{t("buttons.subtitle")}</p>
      </div>

      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg"
            >
              {notification}
            </div>
          ))}
        </div>
      )}

      <Tabs defaultValue="shopping" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="shopping">{t("buttons.categories.shopping").split(" ")[0]}</TabsTrigger>
          <TabsTrigger value="navigation">{t("buttons.categories.navigation").split(" ")[0]}</TabsTrigger>
          <TabsTrigger value="user">{t("buttons.categories.user").split(" ")[0]}</TabsTrigger>
          <TabsTrigger value="actions">{t("buttons.categories.actions").split(" ")[0]}</TabsTrigger>
        </TabsList>

        {Object.entries(buttonCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {category.title}
                  <Badge variant="secondary">
                    {category.buttons.length} {t("buttons.status.count")}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.buttons.map((button) => {
                    const Icon = button.icon
                    const isActive = activeButtons.includes(button.id)

                    return (
                      <div key={button.id} className="space-y-2">
                        <Button
                          variant={isActive ? "default" : button.variant}
                          className={`w-full transition-all duration-200 ${isActive ? "ring-2 ring-primary scale-105" : ""}`}
                          onClick={() => handleButtonClick(button.id, button.label)}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {button.label}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {isActive ? t("common.active") : t("buttons.status.ready")}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Активті түймелер тізімі */}
                {activeButtons.length > 0 && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">{t("buttons.status.active")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeButtons.map((buttonId) => {
                        const allButtons = Object.values(buttonCategories).flatMap((cat) => cat.buttons)
                        const button = allButtons.find((b) => b.id === buttonId)
                        return button ? (
                          <Badge key={buttonId} variant="default" className="animate-pulse">
                            {button.label}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
