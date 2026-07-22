import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Lock, Eye, ChevronRight } from 'lucide-react';
import { DocumentRef } from '../types';
import { DocumentModal } from '../../../components/DocumentModal';

interface ProjectDocumentsProps {
  documents: DocumentRef[];
}

export const ProjectDocuments: React.FC<ProjectDocumentsProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentRef | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc, index) => {
          const isAvailable = doc.status === 'available' && doc.href;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
            >
              <button
                onClick={() => isAvailable && setSelectedDoc(doc)}
                disabled={!isAvailable}
                className={`group w-full flex h-full flex-col text-left rounded-xl border border-border bg-card p-5 shadow-flat transition-all duration-200 ${
                  isAvailable 
                    ? 'cursor-pointer hover:border-primary/30 hover:shadow-soft' 
                    : 'opacity-80 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <FileText className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </div>
                  {isAvailable ? (
                    <span className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[9px] font-bold uppercase text-primary transition-colors group-hover:bg-primary/10">
                      <Eye className="h-3 w-3" />
                      Visualizar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[9px] font-bold uppercase text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      Em breve
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-bold text-foreground">{doc.title}</h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{doc.description}</p>
                {isAvailable && (
                  <div className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                    <span>Abrir Documentação</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <DocumentModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.title || ''}
        docUrl={selectedDoc?.href || ''}
      />
    </>
  );
};
