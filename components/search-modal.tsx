"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, Monitor } from "lucide-react"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockProducts = [
  {
    id: 1,
    name: "Intel Core i9-13900K",
    category: "Процессорлар",
    price: "₸285,000",
    image: "/intel-processor.png",
  },
  { id: 2, name: "NVIDIA RTX 4090", category: "Видеокарталар", price: "₸950,000", image: "/nvidia-graphics-card.jpg" },
  { id: 3, name: "Samsung 980 PRO 2TB", category: "SSD", price: "₸125,000", image: "/samsung-ssd.png" },
  { id: 4, name: "Corsair Vengeance 32GB", category: "Жады", price: "₸85,000", image: "/corsair-memory.jpg" },
]

const popularSearches = ["RTX 4090", "Intel i9", "Gaming жады", "SSD 2TB", "Механикалық пернетақта"]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(mockProducts)

  useEffect(() => {
    if (query.trim()) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults(mockProducts)
    }
  }, [query])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Өнімдерді іздеу
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Өнімдерді іздеу..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Popular Searches */}
          {!query && (
            <div>
              <h3 className="text-sm font-medium mb-2">Танымал іздеулер</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <Badge
                    key={search}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => setQuery(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Нәтижелер ({results.length})</h3>
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => onOpenChange(false)}
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-8">
                <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">"{query}" үшін нәтиже табылмады</p>
                <p className="text-sm text-muted-foreground mt-1">Басқа кілт сөздерді қолданып көріңіз</p>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
