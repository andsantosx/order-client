import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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
        price: false,
        size: false,
        category: false,
        brand: false,
        sort: false
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
                <div className="space-y-3 pt-1">
                    <Slider
                        value={[
                            minPrice === "" ? 0 : Number(minPrice),
                            maxPrice === "" ? 1000 : Number(maxPrice)
                        ]}
                        max={1000}
                        step={10}
                        onValueChange={(vals) => {
                            setMinPrice(vals[0].toString());
                            setMaxPrice(vals[1].toString());
                        }}
                        onValueCommit={applyPriceFilter}
                        className="py-4"
                    />
                    <div className="flex items-center gap-1">
                        <div className="flex-1">
                            <div className="flex items-center justify-center rounded-sm border border-border bg-secondary/10 h-7 px-1.5">
                                <span className="text-[8px] text-muted-foreground font-medium mr-0.5">R$</span>
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
                                    className="w-10 min-w-0 bg-transparent border-none h-6 p-0 shadow-none focus-visible:ring-0 text-[9px] text-left placeholder:text-muted-foreground/50"
                                    // Remove arrows from input
                                    style={{ MozAppearance: 'textfield' }}
                                />
                            </div>
                        </div>
                        <span className="text-muted-foreground text-[8px]">—</span>
                        <div className="flex-1">
                            <div className="flex items-center justify-center rounded-sm border border-border bg-secondary/10 h-7 px-1.5">
                                <span className="text-[8px] text-muted-foreground font-medium mr-0.5">R$</span>
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
                                    className="w-10 min-w-0 bg-transparent border-none h-6 p-0 shadow-none focus-visible:ring-0 text-[9px] text-left placeholder:text-muted-foreground/50"
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
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                    {availableSizes.length > 0 ? availableSizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSizes.includes(size) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSize(size)}
                            className="w-full text-[9px] h-7 px-0"
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
                <div className="space-y-1.5 pt-1">
                    {availableCategories.length > 0 ? availableCategories.map((category) => (
                        <div key={category.slug} className="flex items-center space-x-2">
                            <Checkbox
                                id={`cat-${category.slug}`}
                                checked={selectedCategories.includes(category.slug)}
                                onCheckedChange={() => toggleCategory(category.slug)}
                            />
                            <label
                                htmlFor={`cat-${category.slug}`}
                                className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
                <div className="space-y-1.5 pt-1">
                    {availableBrands && availableBrands.length > 0 ? availableBrands.map((brand) => (
                        <div key={brand.slug} className="flex items-center space-x-2">
                            <Checkbox
                                id={`brand-${brand.slug}`}
                                checked={selectedBrands && selectedBrands.includes(brand.slug)}
                                onCheckedChange={() => toggleBrand && toggleBrand(brand.slug)}
                            />
                            <label
                                htmlFor={`brand-${brand.slug}`}
                                className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
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
                <div className="space-y-2 pt-1">
                    {SORT_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setSortBy(option.value)}
                            className={cn(
                                "flex items-center justify-between w-full py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors",
                                sortBy === option.value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {option.label}
                            {sortBy === option.value && <div className="w-1 h-1 bg-foreground rounded-full" />}
                        </button>
                    ))}
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
        <div className="border-b border-border/50">
            <button
                onClick={onToggle}
                className="flex items-center justify-between w-full py-2.5 text-[9px] font-bold uppercase tracking-[0.25em] hover:text-primary transition-colors group"
            >
                {title}
                <Plus className={cn("w-4 h-4 transition-transform duration-300", isOpen && "rotate-45")} />
            </button>

            <div
                className={cn(
                    "grid transition-all duration-500 ease-in-out overflow-hidden",
                    isOpen ? "grid-rows-[1fr] opacity-100 mb-3" : "grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="min-h-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
