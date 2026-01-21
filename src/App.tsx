import { Button } from './components/ui/button'

export default function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Order Client
        </h1>
        <p className="text-slate-600 mb-6">
          Bem-vindo ao seu projeto
        </p>
        <Button>Começar</Button>
      </div>
    </div>
  )
}
