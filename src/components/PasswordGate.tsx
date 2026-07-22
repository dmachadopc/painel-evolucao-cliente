import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { ACCESS_PASSWORD, ACCESS_SESSION_KEY } from '../config/access';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ACCESS_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      try {
        sessionStorage.setItem(ACCESS_SESSION_KEY, 'true');
      } catch {
        // sessionStorage indisponível (ex: navegação privada); segue sem persistir.
      }
      setError(false);
      setAuthenticated(true);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4 font-sans">
      <Card className="login-enter w-full max-w-sm shadow-soft-md">
        <CardHeader className="items-center text-center">
          <img
            src="/assets/logos/ravem-erp-logo.webp"
            alt="Ravem ERP Logo"
            className="mb-4 h-36 w-auto max-w-full object-contain"
          />
          <CardTitle className="text-base">Acesso restrito</CardTitle>
          <CardDescription>
            Digite a senha de acesso para visualizar a Evolução do Projeto do Ravem ERP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="pe-password" className="text-xs font-semibold text-muted-foreground">
                Senha
              </label>
              <input
                id="pe-password"
                type="password"
                autoFocus
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError(false);
                }}
                className="h-9 w-full rounded-lg border border-input bg-card px-3 text-xs text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Digite a senha"
              />
              {error && (
                <p className="flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-destructive">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Senha incorreta. Tente novamente.
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Acessar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
