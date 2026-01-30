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
import { Menu, Search, ShoppingBag, User as UserIcon, ChevronDown } from "lucide-react";

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
          { name: "Camisetas", href: "/loja?category=camisetas" },
          { name: "Moletons", href: "/loja?category=moletons" },
          { name: "Jaquetas", href: "/loja?category=jaquetas" },
        ]
      },
      {
        title: "PARTE INFERIOR",
        items: [
          { name: "Calças", href: "/loja?category=calcas" },
          { name: "Shorts", href: "/loja?category=shorts" },
          { name: "Conjuntos", href: "/loja?category=conjuntos" },
        ]
      },
    ]
  },
  {
    name: "ACESSÓRIOS",
    href: "/loja?category=acessorios",
    hasDropdown: true,
    columns: [
      {
        title: "CATEGORIAS",
        items: [
          { name: "Bonés", href: "/loja?category=bones" },
          { name: "Bolsas", href: "/loja?category=bolsas" },
          { name: "Ver Tudo", href: "/loja?category=acessorios" },
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
  const { items: wishlistItems } = useWishlistStore();
  const { items: cartItems, toggleCart } = useCartStore();
  const { user, logout } = useAuthStore();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      window.location.href = `/loja?search=${encodeURIComponent(searchTerm.trim())}`;
    }
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
              <div className="flex flex-col gap-8 pt-12">
                <nav className="flex flex-col gap-1">
                  {megaMenuItems.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 text-sm font-medium tracking-wide text-foreground/80 hover:text-foreground hover:bg-secondary/30 transition-colors"
                      >
                        {item.name}
                        {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                      </a>
                      {item.hasDropdown && item.columns && (
                        <div className="pl-4 border-l border-border ml-4">
                          {item.columns.map((col) => (
                            <div key={col.title} className="mb-3">
                              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider px-4 py-1">{col.title}</p>
                              {col.items.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block py-1.5 px-4 text-xs text-foreground/60 hover:text-foreground transition-colors"
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
