import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
    selectedSizes: string[];
    setSelectedSizes: (sizes: string[]) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    selectedBrands?: string[];
    setSelectedBrands?: (brands: string[]) => void;
    minPrice?: number;
    maxPrice?: number;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
    setActiveMinPrice: (val?: number) => void;
    setActiveMaxPrice: (val?: number) => void;
    clearAll: () => void;
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
}

export function ActiveFilters({
    selectedSizes,
    setSelectedSizes,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    setActiveMinPrice,
    setActiveMaxPrice,
    clearAll,
    searchQuery,
    setSearchQuery
}: ActiveFiltersProps) {
    const hasFilters = selectedSizes.length > 0 || selectedCategories.length > 0 || (selectedBrands && selectedBrands.length > 0) || minPrice !== undefined || maxPrice !== undefined || !!searchQuery;

    if (!hasFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">

            {/* Sizes */}
            {selectedSizes.map(size => (
                <Badge key={`size-${size}`} variant="outline" className="gap-1 pl-3 pr-1 py-1.5 border-border rounded-none text-[10px] font-black uppercase tracking-widest bg-secondary/30">
                    Tam: {size}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent hover:text-primary transition-colors"
                        onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {/* Categories */}
            {selectedCategories.map(cat => (
                <Badge key={`cat-${cat}`} variant="outline" className="gap-1 pl-3 pr-1 py-1.5 border-border rounded-none text-[10px] font-black uppercase tracking-widest bg-secondary/30">
                    {cat}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent hover:text-primary transition-colors"
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {/* Brands */}
            {selectedBrands && selectedBrands.map(brand => (
                <Badge key={`brand-${brand}`} variant="outline" className="gap-1 pl-3 pr-1 py-1.5 border-border rounded-none text-[10px] font-black uppercase tracking-widest bg-secondary/30">
                    {brand}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent hover:text-primary transition-colors"
                        onClick={() => setSelectedBrands?.(selectedBrands.filter(b => b !== brand))}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {/* Price */}
            {(minPrice !== undefined || maxPrice !== undefined) && (
                <Badge variant="outline" className="gap-1 pl-3 pr-1 py-1.5 border-border rounded-none text-[10px] font-black uppercase tracking-widest bg-secondary/30">
                    R$ {minPrice || 0} — R$ {maxPrice || '...'}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent hover:text-primary transition-colors"
                        onClick={() => {
                            setMinPrice("");
                            setMaxPrice("");
                            setActiveMinPrice(undefined);
                            setActiveMaxPrice(undefined);
                        }}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            )}

            {/* Search Query */}
            {searchQuery && (
                <Badge variant="outline" className="gap-1 pl-3 pr-1 py-1.5 border-border rounded-none text-[10px] font-black uppercase tracking-widest bg-secondary/30">
                    "{searchQuery}"
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent hover:text-primary transition-colors"
                        onClick={() => setSearchQuery?.("")}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            )}

            <Button variant="link" size="sm" onClick={clearAll} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary h-auto p-0 ml-4">
                Limpar Tudo
            </Button>
        </div>
    );
}
