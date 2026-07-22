import React from 'react';
import { motion } from 'motion/react';
import { FileText, Lock } from 'lucide-react';
import { DocumentRef } from '../types';

interface ProjectDocumentsProps {
  documents: DocumentRef[];
}

export const ProjectDocuments: React.FC<ProjectDocumentsProps> = ({ documents }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc, index) => {
        const isAvailable = doc.status === 'available' && doc.href;
        const Wrapper = isAvailable ? 'a' : 'div';

        return (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
          >
            <Wrapper
              href={isAvailable ? doc.href : undefined}
              target={isAvailable ? '_blank' : undefined}
              rel={isAvailable ? 'noreferrer' : undefined}
              className={`flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-flat transition-all duration-200 ${
                isAvailable ? 'cursor-pointer hover:border-primary/30 hover:shadow-soft' : 'opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <FileText className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
                {!isAvailable && (
                  <span className="flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Em breve
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">{doc.title}</h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{doc.description}</p>
            </Wrapper>
          </motion.div>
        );
      })}
    </div>
  );
};
