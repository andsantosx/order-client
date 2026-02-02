import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ActiveFiltersProps {
    selectedSizes: string[];
    setSelectedSizes: (sizes: string[]) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    minPrice?: number;
    maxPrice?: number;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
    setActiveMinPrice: (val?: number) => void;
    setActiveMaxPrice: (val?: number) => void;
    clearAll: () => void;
}

export function ActiveFilters({
    selectedSizes,
    setSelectedSizes,
    selectedCategories,
    setSelectedCategories,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    setActiveMinPrice,
    setActiveMaxPrice,
    clearAll
}: ActiveFiltersProps) {
    const hasFilters = selectedSizes.length > 0 || selectedCategories.length > 0 || minPrice !== undefined || maxPrice !== undefined;

    if (!hasFilters) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">

            {/* Sizes */}
            {selectedSizes.map(size => (
                <Badge key={`size-${size}`} variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    Tamanho: {size}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => setSelectedSizes(selectedSizes.filter(s => s !== size))}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {/* Categories */}
            {selectedCategories.map(cat => (
                <Badge key={`cat-${cat}`} variant="secondary" className="gap-1 pl-2 pr-1 py-1 capitalize">
                    {cat}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </Badge>
            ))}

            {/* Price */}
            {(minPrice !== undefined || maxPrice !== undefined) && (
                <Badge variant="secondary" className="gap-1 pl-2 pr-1 py-1">
                    Preço: {minPrice ? `R$ ${minPrice}` : 'R$ 0'} - {maxPrice ? `R$ ${maxPrice}` : '...'}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
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

            <Button variant="link" size="sm" onClick={clearAll} className="text-muted-foreground hover:text-foreground h-auto p-0 ml-2">
                Limpar todos
            </Button>
        </div>
    );
}
