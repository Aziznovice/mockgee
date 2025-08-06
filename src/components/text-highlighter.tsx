
"use client";

import React, { useCallback, useMemo } from 'react';
import type { Highlight } from '@/lib/types';

interface TextHighlighterProps {
  text: string;
  highlights: Highlight[];
  isHighlightingEnabled: boolean;
  onHighlightsChange: (newHighlights: Highlight[]) => void;
}

const getSelectionDetails = (container: HTMLElement) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) return null;
    
    const preSelectionRange = document.createRange();
    preSelectionRange.selectNodeContents(container);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return {
        start,
        end: start + range.toString().length,
        text: range.toString(),
    };
};

export function TextHighlighter({
  text,
  highlights,
  isHighlightingEnabled,
  onHighlightsChange,
}: TextHighlighterProps) {

  const handleMouseUp = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHighlightingEnabled) return;

    const selection = getSelectionDetails(event.currentTarget);
    if (selection && selection.text.trim().length > 0) {
      const newHighlight: Highlight = { start: selection.start, end: selection.end };
      onHighlightsChange([...highlights, newHighlight].sort((a, b) => a.start - b.start));
    }
  }, [isHighlightingEnabled, highlights, onHighlightsChange]);

  const renderedText = useMemo(() => {
    if (highlights.length === 0) {
      return text;
    }

    const parts = [];
    let lastIndex = 0;
    
    highlights.forEach((highlight, i) => {
      // Add text before the highlight
      if (highlight.start > lastIndex) {
        parts.push(text.substring(lastIndex, highlight.start));
      }
      // Add the highlighted text
      parts.push(
        <mark key={i} className="bg-green-200 dark:bg-green-800/70 rounded px-1">
          {text.substring(highlight.start, highlight.end)}
        </mark>
      );
      lastIndex = highlight.end;
    });

    // Add any remaining text after the last highlight
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  }, [text, highlights]);
  

  return (
    <div onMouseUp={handleMouseUp} className="whitespace-pre-wrap select-text text-sm leading-relaxed">
        {renderedText}
    </div>
  );
}
