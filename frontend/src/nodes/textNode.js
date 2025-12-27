// textNode.js - Enhanced with dynamic resizing and variable detection

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { COLORS } from '../constants/colors';
import { extractVariables, calculateHandlePositions } from '../utils/variableParser';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeHeight, setNodeHeight] = useState(data?.height || 120);
  const textareaRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Debounced variable extraction
  const [debouncedText, setDebouncedText] = useState(currText);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedText(currText);
    }, 300); // 300ms debounce

    // Cleanup
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currText]);

  // Extract variables (memoized)
  const variables = useMemo(() => {
    return extractVariables(debouncedText);
  }, [debouncedText]);

  // Calculate handle positions
  const handlePositions = useMemo(() => {
    return calculateHandlePositions(variables.length);
  }, [variables.length]);

  // Handle text change
  const handleTextChange = useCallback((e) => {
    setCurrText(e.target.value);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;

      // Calculate new node height (add padding and header)
      const newHeight = Math.min(Math.max(scrollHeight + 60, 120), 400);
      setNodeHeight(newHeight);

      // Set textarea height
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [currText]);

  const nodeColor = COLORS.nodeTypes.text;

  const baseStyle = {
    width: 250,
    height: nodeHeight,
    background: COLORS.background.card,
    border: `2px solid ${nodeColor}`,
    borderRadius: '8px',
    boxShadow: COLORS.shadow.md,
    padding: 0,
    overflow: 'visible',
    transition: 'height 0.2s ease',
  };

  const headerStyle = {
    background: nodeColor,
    color: 'white',
    padding: '8px 12px',
    fontWeight: '600',
    fontSize: '14px',
  };

  const contentStyle = {
    padding: '12px',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: COLORS.text.secondary,
    marginBottom: '4px',
    display: 'block',
  };

  const textareaStyle = {
    width: '100%',
    padding: '6px 8px',
    border: `1px solid ${COLORS.border.medium}`,
    borderRadius: '4px',
    fontSize: '13px',
    outline: 'none',
    resize: 'none',
    fontFamily: 'inherit',
    minHeight: '60px',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={baseStyle}>
      {/* Variable handles on the left */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${handlePositions[index]}%`,
            background: nodeColor,
            width: '10px',
            height: '10px',
            border: '2px solid white',
            transition: 'top 0.2s ease',
          }}
          title={variable}
        />
      ))}

      {/* Output handle on the right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: nodeColor,
          width: '10px',
          height: '10px',
          border: '2px solid white',
        }}
      />

      {/* Header */}
      <div style={headerStyle}>
        Text
      </div>

      {/* Content */}
      <div style={contentStyle}>
        <label style={labelStyle}>
          Text:
          {variables.length > 0 && (
            <span style={{ marginLeft: '8px', fontSize: '11px', color: COLORS.status.info }}>
              ({variables.length} variable{variables.length !== 1 ? 's' : ''})
            </span>
          )}
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={textareaStyle}
          placeholder="Enter text with {{variables}}..."
        />

        {/* Variable list */}
        {variables.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '11px', color: COLORS.text.secondary }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};
