// utils/variableParser.js
// Utility for parsing variables from text

// Regex pattern for matching {{variableName}}
// Allows spaces, validates JavaScript identifiers
export const VARIABLE_REGEX = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;

/**
 * Extract unique variable names from text
 * @param {string} text - The text to parse
 * @returns {string[]} - Array of unique variable names
 */
export const extractVariables = (text) => {
    if (!text) return [];

    const variables = new Set();
    let match;

    // Reset regex lastIndex
    const regex = new RegExp(VARIABLE_REGEX);

    while ((match = regex.exec(text)) !== null) {
        // Trim whitespace from captured variable name
        const variableName = match[1].trim();
        if (variableName) {
            variables.add(variableName);
        }
    }

    return Array.from(variables);
};

/**
 * Calculate handle positions for variables
 * Distributes handles evenly on the left side
 * @param {number} count - Number of variables
 * @returns {number[]} - Array of percentages (0-100)
 */
export const calculateHandlePositions = (count) => {
    if (count === 0) return [];
    if (count === 1) return [50];

    const positions = [];
    for (let i = 0; i < count; i++) {
        // Position at (i + 1) / (count + 1) * 100%
        positions.push(((i + 1) / (count + 1)) * 100);
    }

    return positions;
};
