"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"

interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
  image: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 89.99,
    category: "Footwear",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Leather Backpack",
    price: 129.99,
    category: "Accessories",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 149.99,
    category: "Outerwear",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    rating: 3,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 119.99,
    category: "Footwear",
    rating: 5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Wool Scarf",
    price: 34.99,
    category: "Accessories",
    rating: 4,
    image: "/placeholder.svg?height=200&width=200",
  },
]

const categories = ["All", "Footwear", "Accessories", "Outerwear", "Clothing"]

export default function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [minRating, setMinRating] = useState(0)
  const [sortOrder, setSortOrder] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const filteredAndSortedProducts = useMemo(() => {
    return mockProducts
      .filter((product) => {
        if (selectedCategory !== "All" && product.category !== selectedCategory) {
          return false
        }
        if (product.rating < minRating) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "price-asc":
            return a.price - b.price
          case "price-desc":
            return b.price - a.price
          default:
            return 0
        }
      })
  }, [selectedCategory, minRating, sortOrder])

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter products by category and rating</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <FilterControls
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    minRating={minRating}
                    setMinRating={setMinRating}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 space-y-6">
            <FilterControls
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Products</h1>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative group border rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart className={favorites.includes(product.id) ? "fill-primary stroke-primary" : ""} />
                  </Button>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating ? "fill-primary stroke-primary" : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.rating})</span>
                  </div>
                  <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterControls({
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
}: {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  minRating: number
  setMinRating: (rating: number) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-4">Minimum Rating</h3>
        <Slider value={[minRating]} onValueChange={(value) => setMinRating(value[0])} max={5} step={1} />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-muted-foreground">0</span>
          <span className="text-sm text-muted-foreground">5</span>
        </div>
      </div>
    </div>
  )
}

