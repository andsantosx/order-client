import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Menu, Search, ShoppingBag, User as UserIcon, ChevronDown, Heart, X } from "lucide-react";

// Mega menu structure - Categorias reais
const megaMenuItems = [
  {
    name: "ROUPAS",
    href: "/loja",
    hasDropdown: true,
    columns: [
      {
        title: "PARTE SUPERIOR",
        items: [
          { name: "Camisetas", href: "/loja?categories=Camisetas" },
          { name: "Moletons", href: "/loja?categories=Moletons" },
          { name: "Jaquetas", href: "/loja?categories=Jaquetas" },
        ]
      },
      {
        title: "PARTE INFERIOR",
        items: [
          { name: "Calças", href: "/loja?categories=Calças" },
          { name: "Shorts", href: "/loja?categories=Shorts" },
          { name: "Conjuntos", href: "/loja?categories=Conjuntos" },
        ]
      },
    ]
  },
  {
    name: "ACESSÓRIOS",
    href: "/loja?categories=Acessórios",
    hasDropdown: true,
    columns: [
      {
        title: "CATEGORIAS",
        items: [
          { name: "Bonés", href: "/loja?categories=Bonés" },
          { name: "Bolsas", href: "/loja?categories=Bolsas" },
          { name: "Ver Tudo", href: "/loja?categories=Acessórios" },
        ]
      },
    ]
  },
  { name: "NOVIDADES", href: "/loja?sort=newest" },
  { name: "CONTATO", href: "/contato" },
  { name: "POLÍTICAS", href: "/sobre" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

  const { items: wishlistItems } = useWishlistStore();
  const { items: cartItems, toggleCart } = useCartStore();
  const { user, logout } = useAuthStore();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/loja?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const handleMobileSearch = () => {
    if (mobileSearchTerm.trim()) {
      window.location.href = `/loja?search=${encodeURIComponent(mobileSearchTerm.trim())}`;
    }
  };

  const toggleMobileItem = (name: string) => {
    setExpandedMobileItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBackground = scrolled || isHovered || activeDropdown !== null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showBackground
        ? "bg-background border-b border-border"
        : "bg-transparent"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setActiveDropdown(null); setSearchOpen(false); }}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center mr-12">
          <span className="text-lg font-bold tracking-tight text-foreground">
            ORDER
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {megaMenuItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 text-[11px] font-medium tracking-wider text-foreground/70 hover:text-foreground transition-colors py-4 uppercase"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative hidden lg:flex items-center">
            {searchOpen ? (
              <form
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="flex items-center"
              >
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-44 px-3 py-1 text-[11px] tracking-wide border-b border-foreground/30 bg-transparent focus:outline-none focus:border-foreground transition-all placeholder:text-foreground/40 uppercase"
                />
                <button
                  type="submit"
                  className="ml-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <Search className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1 text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Wishlist Link */}
          <a
            href="/favoritos"
            className="relative flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                {wishlistItems.length}
              </span>
            )}
          </a>

          {user ? (
            <div className="relative group">
              <button className="flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
                <UserIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <div className="px-4 py-2 text-[11px] font-semibold border-b border-border mb-1">
                    {user.name}
                  </div>
                  {user.isAdmin ? (
                    <a href="/admin" className="block px-4 py-2 text-[11px] hover:bg-secondary/50">Painel Admin</a>
                  ) : (
                    <a href="/profile" className="block px-4 py-2 text-[11px] hover:bg-secondary/50">Minha Conta</a>
                  )}
                  <a href="/favoritos" className="block px-4 py-2 text-[11px] hover:bg-secondary/50">Favoritos ({wishlistItems.length})</a>
                  <button
                    onClick={() => { logout(); window.location.href = "/"; }}
                    className="w-full text-left px-4 py-2 text-[11px] text-destructive hover:bg-destructive/10"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <a href="/login" className="flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
              <UserIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
          )}

          <button
            type="button"
            className="relative flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-medium text-primary-foreground">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-secondary/50 h-8 w-8"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-md bg-background border-border"
            >
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <div className="flex flex-col gap-6 pt-10">
                {/* Mobile Search */}
                <form
                  onSubmit={(e) => { e.preventDefault(); handleMobileSearch(); }}
                  className="relative px-1"
                >
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="BUSCAR PRODUTOS..."
                    className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-secondary/20 text-sm outline-none focus:border-primary transition-colors uppercase placeholder:normal-case"
                    value={mobileSearchTerm}
                    onChange={(e) => setMobileSearchTerm(e.target.value)}
                  />
                </form>

                <nav className="flex flex-col">
                  {megaMenuItems.map((item) => {
                    const isExpanded = expandedMobileItems.includes(item.name);

                    return (
                      <div key={item.name} className="border-b border-border/40 last:border-0">
                        <div
                          className="flex items-center justify-between py-4 px-2 cursor-pointer select-none hover:bg-secondary/20 transition-colors"
                          onClick={() => item.hasDropdown ? toggleMobileItem(item.name) : (window.location.href = item.href)}
                        >
                          <a
                            href={item.href}
                            onClick={(e) => {
                              if (item.hasDropdown) {
                                e.preventDefault();
                                toggleMobileItem(item.name);
                              }
                            }}
                            className="text-sm font-bold tracking-wider text-foreground uppercase"
                          >
                            {item.name}
                          </a>
                          {item.hasDropdown && (
                            <ChevronDown
                              className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          )}
                        </div>

                        {/* Collapsible Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'
                            }`}
                        >
                          {item.hasDropdown && item.columns && (
                            <div className="bg-secondary/10 rounded-md mx-2 p-4 space-y-4">
                              {item.columns.map((col) => (
                                <div key={col.title}>
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-1">
                                    {col.title}
                                  </p>
                                  <div className="flex flex-col gap-2">
                                    {col.items.map((subItem) => (
                                      <a
                                        key={subItem.name}
                                        href={subItem.href}
                                        className="text-sm text-foreground/80 hover:text-foreground pl-2 border-l-2 border-transparent hover:border-primary transition-all"
                                      >
                                        {subItem.name}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mega Menu Dropdown - Full Width */}
      {megaMenuItems.map((item) => (
        item.hasDropdown && item.columns && (
          <div
            key={`dropdown-${item.name}`}
            className={`absolute left-0 right-0 top-14 bg-background border-b border-border shadow-lg transition-all duration-300 ease-out overflow-hidden ${activeDropdown === item.name
              ? 'max-h-96 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
              }`}
          >
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8">
              <div className="flex gap-20">
                {item.columns.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-[11px] font-bold text-foreground uppercase tracking-wider mb-4">
                      {column.title}
                    </h3>
                    <ul className="space-y-3">
                      {column.items.map((subItem) => (
                        <li key={subItem.name}>
                          <a
                            href={subItem.href}
                            className="text-[13px] text-foreground/60 hover:text-foreground transition-colors"
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      ))}
    </header>
  );
}
