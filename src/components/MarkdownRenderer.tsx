import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parser simples para converter Markdown básico em HTML estilizado de forma segura e nativa
  const parseMarkdown = (text: string) => {
    const lines = text.split('\n');
    let inList = false;
    let inCodeBlock = false;
    let codeContent: string[] = [];

    const parsedElements = lines.map((line, index) => {
      const trimmed = line.trim();

      // Fechamento ou Abertura de blocos de código
      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const blockText = codeContent.join('\n');
          codeContent = [];
          return (
            <pre key={index} className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-xs font-mono text-foreground border border-border">
              <code>{blockText}</code>
            </pre>
          );
        } else {
          inCodeBlock = true;
          return null;
        }
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return null;
      }

      // Títulos
      if (trimmed.startsWith('# ')) {
        return <h1 key={index} className="mt-6 mb-3 text-2xl font-bold tracking-tight text-foreground border-b border-border/80 pb-2">{trimmed.slice(2)}</h1>;
      }
      if (trimmed.startsWith('## ')) {
        return <h2 key={index} className="mt-5 mb-2.5 text-xl font-bold tracking-tight text-foreground">{trimmed.slice(3)}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={index} className="mt-4 mb-2 text-base font-bold text-foreground">{trimmed.slice(4)}</h3>;
      }
      if (trimmed.startsWith('#### ')) {
        return <h4 key={index} className="mt-3.5 mb-1.5 text-sm font-bold text-foreground">{trimmed.slice(5)}</h4>;
      }

      // Blockquotes e Alertas (ex: > [!NOTE])
      if (trimmed.startsWith('>')) {
        let blockquoteText = trimmed.slice(1).trim();
        let alertType = '';
        if (blockquoteText.startsWith('[!NOTE]')) {
          alertType = 'NOTE';
          blockquoteText = blockquoteText.replace('[!NOTE]', '').trim();
        } else if (blockquoteText.startsWith('[!IMPORTANT]')) {
          alertType = 'IMPORTANT';
          blockquoteText = blockquoteText.replace('[!IMPORTANT]', '').trim();
        } else if (blockquoteText.startsWith('[!WARNING]')) {
          alertType = 'WARNING';
          blockquoteText = blockquoteText.replace('[!WARNING]', '').trim();
        }

        const alertStyles = alertType === 'NOTE' 
          ? 'border-l-4 border-info bg-info-subtle/40 text-info-subtle-foreground' 
          : alertType === 'IMPORTANT'
          ? 'border-l-4 border-primary bg-primary/5 text-foreground'
          : alertType === 'WARNING'
          ? 'border-l-4 border-warning bg-warning-subtle/30 text-warning-subtle-foreground'
          : 'border-l-4 border-muted-foreground/45 bg-muted/30 text-muted-foreground';

        return (
          <blockquote key={index} className={`my-4 rounded-r-lg p-3.5 text-xs leading-relaxed ${alertStyles}`}>
            {parseInlineStyles(blockquoteText)}
          </blockquote>
        );
      }

      // Listas
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemContent = trimmed.slice(2);
        return (
          <ul key={index} className="my-1.5 list-disc pl-5 text-xs leading-relaxed text-muted-foreground">
            <li>{parseInlineStyles(itemContent)}</li>
          </ul>
        );
      }

      // Linhas em branco
      if (!trimmed) {
        return <div key={index} className="h-2" />;
      }

      // Parágrafos normais
      return (
        <p key={index} className="my-2.5 text-xs leading-relaxed text-muted-foreground">
          {parseInlineStyles(line)}
        </p>
      );
    });

    return parsedElements.filter(el => el !== null);
  };

  // Processa negrito (**text**) e código inline (`code`)
  const parseInlineStyles = (text: string): React.ReactNode[] => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-foreground">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return <div className="space-y-1 select-text">{parseMarkdown(content)}</div>;
};
