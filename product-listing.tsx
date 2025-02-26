"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import ImageComponent from "./ImageComponent";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string[];
  rating: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 89.99,
    category: ["Footwear", "Accessories"],
    rating: 4,
    image: "",
  },
  {
    id: 2,
    name: "Leather Backpack",
    price: 129.99,
    category: ["Accessories", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 3,
    name: "Denim Jacket",
    price: 149.99,
    category: ["Outerwear", "Clothing"],
    rating: 4,
    image: "",
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: ["Clothing", "Outerwear"],
    rating: 3,
    image: "",
  },
  {
    id: 5,
    name: "Running Shoes",
    price: 119.99,
    category: ["Footwear", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 6,
    name: "Wool Scarf",
    price: 34.99,
    category: ["Accessories", "Clothing"],
    rating: 4,
    image: "",
  },
  {
    id: 7,
    name: "new page 1",
    price: 89.99,
    category: ["Footwear", "Accessories"],
    rating: 4,
    image: "",
  },
  {
    id: 8,
    name: "new page 2",
    price: 129.99,
    category: ["Accessories", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 9,
    name: "new page 3",
    price: 149.99,
    category: ["Outerwear", "Clothing"],
    rating: 4,
    image: "",
  },
  {
    id: 10,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: ["Clothing", "Outerwear"],
    rating: 3,
    image: "",
  },
  {
    id: 11,
    name: "Running Shoes",
    price: 119.99,
    category: ["Footwear", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 12,
    name: "Wool Scarf",
    price: 34.99,
    category: ["Accessories", "Clothing"],
    rating: 4,
    image: "",
  },
  {
    id: 13,
    name: "new new page 1",
    price: 89.99,
    category: ["Footwear", "Accessories"],
    rating: 4,
    image: "",
  },
  {
    id: 14,
    name: "new new page 2",
    price: 129.99,
    category: ["Accessories", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 15,
    name: "new new page 3",
    price: 149.99,
    category: ["Outerwear", "Clothing"],
    rating: 4,
    image: "",
  },
  {
    id: 16,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: ["Clothing", "Outerwear"],
    rating: 3,
    image: "",
  },
  {
    id: 17,
    name: "Running Shoes",
    price: 119.99,
    category: ["Footwear", "Clothing"],
    rating: 5,
    image: "",
  },
  {
    id: 18,
    name: "Wool Scarf",
    price: 34.99,
    category: ["Accessories", "Clothing"],
    rating: 4,
    image: "",
  },
];

const categories = ["All", "Footwear", "Accessories", "Outerwear", "Clothing"];

export default function ProductListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredAndSortedProducts = useMemo(() => {
    return mockProducts
      .filter((product) => {
        if (
          selectedCategory !== "All" &&
          !product.category.includes(selectedCategory)
        ) {
          return false;
        }
        if (product.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortOrder) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [selectedCategory, minRating, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
          } else {
            return;
          }
        } else {
          return;
        }
      });
    });

    observer.observe(document.querySelector(".myElement") as Element);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
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
                  <SheetDescription>
                    Filter products by category and rating
                  </SheetDescription>
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

          <div className="hidden md:block w-64 space-y-6">
            <FilterControls
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

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
                    <Heart
                      className={
                        favorites.includes(product.id)
                          ? "fill-primary stroke-primary"
                          : ""
                      }
                    />
                  </Button>
                  <ImageComponent />

                  <h3 className="font-semibold">{product.name}</h3>
                  {product?.category?.map((category) => (
                    <p className="text-muted-foreground">{category}</p>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? "fill-primary stroke-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>
                  <p className="font-bold mt-2">${product.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-2">
              <p>{currentPage}</p>
              <Button
                className="myElement"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Load more
              </Button>
              <p>{totalPages}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterControls({
  selectedCategory,
  setSelectedCategory,
  minRating,
  setMinRating,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
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
        <Slider
          value={[minRating]}
          onValueChange={(value) => setMinRating(value[0])}
          max={5}
          step={1}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-muted-foreground">0</span>
          <span className="text-sm text-muted-foreground">5</span>
        </div>
      </div>
    </div>
  );
}
