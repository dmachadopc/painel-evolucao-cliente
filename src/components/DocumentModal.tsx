import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Download, FileText } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  docUrl: string;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({
  isOpen,
  onClose,
  title,
  docUrl
}) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen || !docUrl) return;

    setLoading(true);
    setError(false);
    setContent('');

    fetch(docUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao carregar o arquivo');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [isOpen, docUrl]);

  // Bloqueia scroll do background ao abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col rounded-xl border border-border bg-card shadow-soft-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground sm:text-base">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={docUrl}
                  download
                  title="Baixar documento"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Download className="h-4.5 w-4.5" />
                </a>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:px-8">
              {loading ? (
                <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-xs font-medium">Carregando documentação...</span>
                </div>
              ) : error ? (
                <div className="flex h-64 w-full flex-col items-center justify-center gap-2 text-destructive">
                  <span className="text-sm font-bold">Erro ao carregar o arquivo.</span>
                  <span className="text-xs text-muted-foreground">Verifique se o arquivo existe na pasta public/docs.</span>
                </div>
              ) : (
                <article className="prose max-w-none dark:prose-invert">
                  <MarkdownRenderer content={content} />
                </article>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
