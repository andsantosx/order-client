import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Search, Menu, X, Heart, ShoppingBag, User as UserIcon } from "lucide-react";

const navLinks = [
  { name: "Loja", href: "/loja" },
  { name: "Novidades", href: "/loja?sort=newest" },
  { name: "Favoritos", href: "/favoritos" },
  { name: "Contato", href: "#contato" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items: wishlistItems } = useWishlistStore();
  const { items: cartItems, toggleCart } = useCartStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <div className="relative">
            <span className="font-[var(--font-display)] text-2xl font-bold tracking-tight text-foreground">
              ORDER
            </span>
            <span className="font-[var(--font-display)] text-2xl font-light tracking-tight text-primary ml-1">
              STORE
            </span>
            <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium tracking-wide text-foreground/70 hover:text-foreground transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <div className="hidden md:flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-48 border-0 bg-transparent text-sm focus-visible:ring-0 p-0 h-auto placeholder:text-muted-foreground/50"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="hover:bg-secondary/50 rounded-full h-10 w-10"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-secondary/50 rounded-full h-10 w-10"
          >
            <a
              href="/favoritos"
              className="flex items-center justify-center w-full h-full"
            >
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {wishlistItems.length}
                </span>
              )}
            </a>
            <span className="sr-only">Favoritos</span>
          </Button>

          {/* User Menu */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-secondary/50">
                <UserIcon className="h-5 w-5" />
              </button>
              {/* Simple Dropdown for demo, ideal would be Radix DropdownMenu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="p-2">
                  <div className="px-2 py-1.5 text-sm font-semibold border-b mb-1">
                    {user.name}
                  </div>
                  {user.isAdmin ? (
                    <a href="/admin" className="block px-2 py-1.5 text-sm hover:bg-secondary rounded">Painel Admin</a>
                  ) : (
                    <a href="/profile" className="block px-2 py-1.5 text-sm hover:bg-secondary rounded">Minha Conta</a>
                  )}
                  <button
                    onClick={() => { logout(); window.location.href = "/"; }}
                    className="w-full text-left px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded mt-1"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon" className="hover:bg-secondary/50 rounded-full h-10 w-10" asChild>
              <a href="/login">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Entrar</span>
              </a>
            </Button>
          )}

          {/* Cart Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative hover:bg-secondary/50 rounded-full h-10 w-10"
            onClick={toggleCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
            <span className="sr-only">Carrinho</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-secondary/50 rounded-full h-10 w-10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-md bg-background/95 backdrop-blur-xl border-border"
            >
              <SheetTitle className="sr-only">Menu de navegacao</SheetTitle>
              <div className="flex flex-col gap-8 pt-12">
                <div className="flex items-center gap-3 bg-secondary/30 px-4 py-3 rounded-2xl border border-border">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    className="border-0 bg-transparent text-base focus-visible:ring-0 placeholder:text-muted-foreground/50"
                  />
                </div>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group py-4 px-4 text-3xl font-[var(--font-display)] font-light tracking-wide text-foreground/70 hover:text-foreground transition-all hover:bg-secondary/20 rounded-xl flex items-center justify-between"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {link.name}
                      <span className="text-sm font-sans text-muted-foreground group-hover:text-primary transition-colors">
                        0{index + 1}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
