import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
    minPrice: string;
    maxPrice: string;
    setMinPrice: (value: string) => void;
    setMaxPrice: (value: string) => void;
    applyPriceFilter: () => void;

    selectedSizes: string[];
    setSelectedSizes: (sizes: string[]) => void;

    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;

    selectedBrands?: string[];
    setSelectedBrands?: (brands: string[]) => void;

    sortBy: string;
    setSortBy: (value: string) => void;

    availableCategories: { name: string; slug: string }[];
    availableBrands?: { name: string; slug: string }[];
    availableSizes: string[];

    className?: string;
}

const SORT_OPTIONS = [
    { label: "Mais Recentes", value: "newest" },
    { label: "Preço: Menor para Maior", value: "price-low" },
    { label: "Preço: Maior para Menor", value: "price-high" }
];

export function FilterSidebar({
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    applyPriceFilter,
    selectedSizes,
    setSelectedSizes,
    selectedCategories,
    setSelectedCategories,
    selectedBrands,
    setSelectedBrands,
    sortBy,
    setSortBy,
    availableCategories,
    availableBrands,
    availableSizes,
    className
}: FilterSidebarProps) {
    const [openSections, setOpenSections] = useState({
        price: true,
        size: true,
        category: true,
        brand: true,
        sort: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const toggleSize = (size: string) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const toggleCategory = (slug: string) => {
        if (selectedCategories.includes(slug)) {
            setSelectedCategories(selectedCategories.filter(c => c !== slug));
        } else {
            setSelectedCategories([...selectedCategories, slug]);
        }
    };

    const toggleBrand = (slug: string) => {
        if (!selectedBrands || !setSelectedBrands) return;
        if (selectedBrands.includes(slug)) {
            setSelectedBrands(selectedBrands.filter(b => b !== slug));
        } else {
            setSelectedBrands([...selectedBrands, slug]);
        }
    };

    return (
        <div className={cn("space-y-8 flex flex-col h-full", className)}>
            <CollapsibleSection
                title="Preço"
                isOpen={openSections.price}
                onToggle={() => toggleSection('price')}
            >
                <div className="space-y-6 pt-4">
                    <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        onValueChange={(vals) => {
                            setMinPrice(vals[0].toString());
                            setMaxPrice(vals[1].toString());
                        }}
                        onValueCommit={applyPriceFilter}
                        className="py-4"
                    />
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <div className="flex items-center justify-center rounded-md border border-border bg-secondary/20 h-10 px-3">
                                <span className="text-sm text-muted-foreground font-medium mr-1">R$</span>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={minPrice}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (Number(val) >= 0 || val === "") setMinPrice(val);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                                    onBlur={applyPriceFilter}
                                    className="w-14 min-w-0 bg-transparent border-none h-auto p-0 shadow-none focus-visible:ring-0 text-left placeholder:text-muted-foreground/50"
                                    // Remove arrows from input
                                    style={{ MozAppearance: 'textfield' }}
                                />
                            </div>
                        </div>
                        <span className="text-muted-foreground">—</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-center rounded-md border border-border bg-secondary/20 h-10 px-3">
                                <span className="text-sm text-muted-foreground font-medium mr-1">R$</span>
                                <Input
                                    type="number"
                                    min="0"
                                    placeholder="1000"
                                    value={maxPrice}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (Number(val) >= 0 || val === "") setMaxPrice(val);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && applyPriceFilter()}
                                    onBlur={applyPriceFilter}
                                    className="w-14 min-w-0 bg-transparent border-none h-auto p-0 shadow-none focus-visible:ring-0 text-left placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title="Tamanho"
                isOpen={openSections.size}
                onToggle={() => toggleSection('size')}
            >
                <div className="grid grid-cols-3 gap-2 pt-4">
                    {availableSizes.length > 0 ? availableSizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSize(size)}
                            className="w-full"
                        >
                            {size}
                        </Button>
                    )) : (
                        <p className="text-sm text-muted-foreground col-span-3">Carregando...</p>
                    )}
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title="Categorias"
                isOpen={openSections.category}
                onToggle={() => toggleSection('category')}
            >
                <div className="space-y-3 pt-4">
                    {availableCategories.length > 0 ? availableCategories.map((category) => (
                        <div key={category.slug} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${category.slug}`}
                                checked={selectedCategories.includes(category.slug)}
                                onCheckedChange={() => toggleCategory(category.slug)}
                            />
                            <label
                                htmlFor={`cat-${category.slug}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {category.name}
                            </label>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground">Carregando...</p>
                    )}
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title="Marcas"
                isOpen={openSections.brand}
                onToggle={() => toggleSection('brand')}
            >
                <div className="space-y-3 pt-4">
                    {availableBrands && availableBrands.length > 0 ? availableBrands.map((brand) => (
                        <div key={brand.slug} className="flex items-center space-x-2">
                            <Checkbox
                                id={`brand-${brand.slug}`}
                                checked={selectedBrands && selectedBrands.includes(brand.slug)}
                                onCheckedChange={() => toggleBrand && toggleBrand(brand.slug)}
                            />
                            <label
                                htmlFor={`brand-${brand.slug}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                                {brand.name}
                            </label>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground">Carregando...</p>
                    )}
                </div>
            </CollapsibleSection>

            <CollapsibleSection
                title="Ordenar"
                isOpen={openSections.sort}
                onToggle={() => toggleSection('sort')}
            >
                <div className="space-y-2 pt-4">
                    <RadioGroup value={sortBy} onValueChange={setSortBy}>
                        {SORT_OPTIONS.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                                <label htmlFor={`sort-${option.value}`} className="text-sm font-medium cursor-pointer">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </CollapsibleSection>
        </div>
    );
}

// Internal reusable component for animation
function CollapsibleSection({
    title,
    isOpen,
    onToggle,
    children
}: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors group"
            >
                {title}
                <div className="relative w-4 h-4 flex items-center justify-center">
                    {/* Animated Plus/Minus using rotation */}
                    <Plus className={cn("w-4 h-4 absolute transition-all duration-300 ease-in-out", isOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100")} />
                    <Minus className={cn("w-4 h-4 absolute transition-all duration-300 ease-in-out", isOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50")} />
                </div>
            </button>

            <div
                className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}
