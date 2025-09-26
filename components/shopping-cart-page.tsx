"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { t } from "@/lib/translations"

export function ShoppingCartPage() {
  const { state, dispatch } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    })
  }

  const removeItem = (id: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    })
  }

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(state.total * 0.1)
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(state.total * 0.2)
    } else {
      setDiscount(0)
    }
  }

  const shipping = state.total > 135000 ? 0 : 9000 // 135,000 теңге = $299 шамасында
  const tax = (state.total - discount) * 0.08
  const finalTotal = state.total - discount + shipping + tax

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("cart.empty")}</h1>
          <p className="text-muted-foreground mb-6">{t("cart.emptyDescription")}</p>
          <Link href="/shop">
            <Button size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("cart.continueShopping")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("cart.title")}</h1>
        <p className="text-muted-foreground">{t("cart.subtitle")}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          ₸{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">бірі үшін ₸{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Link href="/shop">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("cart.continueShopping")}
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => dispatch({ type: "CLEAR_CART" })}
              className="text-destructive hover:text-destructive"
            >
              {t("cart.clearCart")}
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("cart.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("cart.subtotal")} ({state.itemCount} тауар)
                </span>
                <span className="font-medium">₸{state.total.toLocaleString()}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t("cart.discount")}</span>
                  <span>-₸{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.shipping")}</span>
                <span className="font-medium">{shipping === 0 ? t("cart.free") : `₸${shipping.toLocaleString()}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("cart.tax")}</span>
                <span className="font-medium">₸{tax.toLocaleString()}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>{t("cart.total")}</span>
                <span>₸{finalTotal.toLocaleString()}</span>
              </div>

              {state.total < 135000 && (
                <p className="text-sm text-muted-foreground">
                  {t("cart.freeShippingMessage").replace("$X", `₸${(135000 - state.total).toLocaleString()}`)}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("cart.promoCode")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder={t("cart.promoPlaceholder")}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button variant="outline" onClick={applyPromoCode}>
                  {t("cart.apply")}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Көріңіз: SAVE10 немесе WELCOME20</p>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button size="lg" className="w-full">
            <CreditCard className="h-4 w-4 mr-2" />
            {t("cart.proceedCheckout")}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>{t("cart.secureCheckout")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
