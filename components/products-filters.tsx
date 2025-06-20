"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

const categories = [
  { id: "poker", name: "Poker", count: 8 },
  { id: "blackjack", name: "Blackjack", count: 3 },
  { id: "roulette", name: "Roulette", count: 2 },
  { id: "dice", name: "Dice", count: 4 },
  { id: "cards", name: "Cards", count: 6 },
  { id: "accessories", name: "Accessories", count: 5 },
]

const brands = [
  { id: "casinoelite", name: "CasinoElite", count: 12 },
  { id: "pokerpro", name: "PokerPro", count: 8 },
  { id: "vegastech", name: "VegasTech", count: 6 },
  { id: "royalgaming", name: "RoyalGaming", count: 4 },
]

export default function ProductsFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 2000])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 2000])
  }

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000

  return (
    <div className="space-y-6">
      {hasActiveFilters && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-sm">Active Filters</CardTitle>
              <button
                onClick={clearFilters}
                className="text-slate-400 hover:text-white text-sm flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId)
                return (
                  <Badge key={categoryId} variant="secondary" className="bg-amber-500/20 text-amber-400">
                    {category?.name}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleCategory(categoryId)} />
                  </Badge>
                )
              })}
              {selectedBrands.map((brandId) => {
                const brand = brands.find((b) => b.id === brandId)
                return (
                  <Badge key={brandId} variant="secondary" className="bg-purple-500/20 text-purple-400">
                    {brand?.name}
                    <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => toggleBrand(brandId)} />
                  </Badge>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                    className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <label
                    htmlFor={category.id}
                    className="text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    {category.name}
                  </label>
                </div>
                <span className="text-slate-500 text-sm">({category.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={50} className="w-full" />
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Brands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={brand.id}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => toggleBrand(brand.id)}
                    className="border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <label
                    htmlFor={brand.id}
                    className="text-slate-300 cursor-pointer hover:text-white transition-colors"
                  >
                    {brand.name}
                  </label>
                </div>
                <span className="text-slate-500 text-sm">({brand.count})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
