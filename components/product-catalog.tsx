"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useCart } from "@/components/cart-provider"
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { t } from "@/lib/translations"

// Mock product data
const products = [
  {
    id: "1",
    name: "Intel Core i9-14900K",
    price: 265000,
    originalPrice: 292000,
    rating: 4.8,
    reviews: 124,
    image: "/intel-core-i9-processor-in-packaging.jpg",
    category: "processors",
    brand: "Intel",
    inStock: true,
    description: "24-core processor with 32 threads, up to 6.0 GHz boost clock",
  },
  {
    id: "2",
    name: "AMD Ryzen 9 7950X",
    price: 247500,
    originalPrice: 315000,
    rating: 4.7,
    reviews: 89,
    image: "/modern-cpu-processor-chip.jpg",
    category: "processors",
    brand: "AMD",
    inStock: true,
    description: "16-core processor with 32 threads, up to 5.7 GHz boost clock",
  },
  {
    id: "3",
    name: "NVIDIA RTX 4080 Super",
    price: 450000,
    originalPrice: 540000,
    rating: 4.9,
    reviews: 156,
    image: "/nvidia-rtx-4080-graphics-card.jpg",
    category: "graphics",
    brand: "NVIDIA",
    inStock: true,
    description: "High-performance graphics card with 16GB GDDR6X memory",
  },
  {
    id: "4",
    name: "AMD Radeon RX 7900 XTX",
    price: 405000,
    rating: 4.6,
    reviews: 98,
    image: "/high-end-graphics-card-with-rgb-lighting.jpg",
    category: "graphics",
    brand: "AMD",
    inStock: true,
    description: "24GB GDDR6 memory, excellent for 4K gaming",
  },
  {
    id: "5",
    name: "Logitech G Pro X Superlight",
    price: 67500,
    rating: 4.8,
    reviews: 256,
    image: "/logitech-gaming-mouse-white.jpg",
    category: "mice",
    brand: "Logitech",
    inStock: true,
    description: "Ultra-lightweight wireless gaming mouse, 25K sensor",
  },
  {
    id: "6",
    name: "Razer DeathAdder V3",
    price: 40500,
    rating: 4.5,
    reviews: 189,
    image: "/gaming-mouse-with-rgb-lighting.jpg",
    category: "mice",
    brand: "Razer",
    inStock: true,
    description: "Ergonomic gaming mouse with Focus Pro 30K sensor",
  },
  {
    id: "7",
    name: "SteelSeries Arctis 7P",
    price: 81000,
    rating: 4.4,
    reviews: 145,
    image: "/gaming-headset-with-microphone.jpg",
    category: "headsets",
    brand: "SteelSeries",
    inStock: true,
    description: "Wireless gaming headset with lossless 2.4GHz connection",
  },
  {
    id: "8",
    name: "Corsair K95 RGB Platinum",
    price: 90000,
    originalPrice: 112500,
    rating: 4.7,
    reviews: 234,
    image: "/mechanical-gaming-keyboard-with-rgb.jpg",
    category: "keyboards",
    brand: "Corsair",
    inStock: true,
    description: "Mechanical gaming keyboard with Cherry MX switches",
  },
  {
    id: "9",
    name: "Samsung 980 PRO 2TB NVMe",
    price: 90000,
    originalPrice: 112500,
    rating: 4.6,
    reviews: 178,
    image: "/samsung-nvme-ssd-drive.jpg",
    category: "storage",
    brand: "Samsung",
    inStock: true,
    description: "PCIe 4.0 NVMe SSD with up to 7,000 MB/s read speeds",
  },
  {
    id: "10",
    name: "WD Black SN850X 1TB",
    price: 58500,
    rating: 4.5,
    reviews: 156,
    image: "/nvme-ssd-and-hard-drive-storage.jpg",
    category: "storage",
    brand: "Western Digital",
    inStock: false,
    description: "High-performance gaming SSD with heatsink",
  },
]

const categories = [
  { id: "processors", name: t("categories.processors"), count: 2 },
  { id: "graphics", name: t("categories.graphics"), count: 2 },
  { id: "mice", name: "Ойын тышқандары", count: 2 },
  { id: "headsets", name: "Құлақаспаптар", count: 1 },
  { id: "keyboards", name: "Пернетақталар", count: 1 },
  { id: "storage", name: t("categories.storage"), count: 2 },
]

const brands = [
  { id: "intel", name: t("brands.intel"), count: 1 },
  { id: "amd", name: t("brands.amd"), count: 2 },
  { id: "nvidia", name: t("brands.nvidia"), count: 1 },
  { id: "logitech", name: t("brands.logitech"), count: 1 },
  { id: "razer", name: "Razer", count: 1 },
  { id: "steelseries", name: "SteelSeries", count: 1 },
  { id: "corsair", name: t("brands.corsair"), count: 1 },
  { id: "samsung", name: "Samsung", count: 1 },
  { id: "western-digital", name: "Western Digital", count: 1 },
]

export function ProductCatalog() {
  const searchParams = useSearchParams()
  const { dispatch } = useCart()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : [],
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 540000])
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase().replace(/\s+/g, "-"))
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, sortBy])

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const addToCart = (product: (typeof products)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("catalog.title")}</h1>
        <p className="text-xl text-muted-foreground">{t("catalog.subtitle")}</p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t("catalog.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Сүзгілер
          </Button>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("catalog.sorting.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("catalog.sorting.nameAZ")}</SelectItem>
              <SelectItem value="price-low">{t("catalog.sorting.priceLowHigh")}</SelectItem>
              <SelectItem value="price-high">{t("catalog.sorting.priceHighLow")}</SelectItem>
              <SelectItem value="rating">{t("catalog.sorting.highestRated")}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">{t("catalog.filters.categories")}</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                    >
                      {category.name}
                    </label>
                    <span className="text-xs text-muted-foreground">({category.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">{t("catalog.filters.brands")}</h3>
              <div className="space-y-3">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                    />
                    <label
                      htmlFor={brand.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                    >
                      {brand.name}
                    </label>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">{t("catalog.filters.priceRange")}</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={540000}
                  min={0}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₸{priceRange[0].toLocaleString()}</span>
                  <span>₸{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredProducts.length} дан {products.length} өнім көрсетілуде
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge variant="destructive" className="absolute top-2 left-2">
                          Sale
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="absolute top-2 left-2">
                          Out of Stock
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-foreground">₸{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₸{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" disabled={!product.inStock} onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? t("catalog.addToCart") : t("catalog.outOfStock")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        {product.originalPrice && (
                          <Badge variant="destructive" className="absolute top-1 left-1 text-xs">
                            Sale
                          </Badge>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                            <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-foreground">₸{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ₸{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <Button disabled={!product.inStock} onClick={() => addToCart(product)}>
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? t("catalog.addToCart") : t("catalog.outOfStock")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">{t("catalog.noProducts")}</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
                  setSelectedBrands([])
                  setPriceRange([0, 540000])
                }}
              >
                {t("catalog.filters.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
