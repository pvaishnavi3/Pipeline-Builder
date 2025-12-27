// nodes/BaseNode.js
// Reusable base component for all node types

import { Handle, Position } from 'reactflow';
import { COLORS } from '../constants/colors';

/**
 * BaseNode - Flexible node component supporting configuration and composition
 */
export const BaseNode = ({ id, data, config }) => {
    const {
        type = 'default',
        title = 'Node',
        description = '',
        fields = [],
        handles = [],
        customContent = null,
        style = {},
    } = config;

    // Get node color based on type
    const nodeColor = COLORS.nodeTypes[type] || COLORS.nodeTypes.text;

    // Base node styles
    const baseStyle = {
        minWidth: 200,
        minHeight: 80,
        background: COLORS.background.card,
        border: `2px solid ${nodeColor}`,
        borderRadius: '8px',
        boxShadow: COLORS.shadow.md,
        padding: 0,
        overflow: 'hidden',
        ...style,
    };

    const headerStyle = {
        background: nodeColor,
        color: 'white',
        padding: '8px 12px',
        fontWeight: '600',
        fontSize: '14px',
        borderBottom: `1px solid ${nodeColor}`,
    };

    const contentStyle = {
        padding: '12px',
    };

    const fieldStyle = {
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        fontSize: '12px',
        fontWeight: '500',
        color: COLORS.text.secondary,
        marginBottom: '4px',
    };

    const inputStyle = {
        padding: '6px 8px',
        border: `1px solid ${COLORS.border.medium}`,
        borderRadius: '4px',
        fontSize: '13px',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    // Render field based on type
    const renderField = (field) => {
        const { name, type: fieldType, label, options } = field;
        const value = data?.[name] || field.default || '';

        // Standard field types
        switch (fieldType) {
            case 'text':
                return (
                    <div key={name} style={fieldStyle}>
                        <label style={labelStyle}>{label}:</label>
                        <input
                            type="text"
                            defaultValue={value}
                            style={inputStyle}
                        />
                    </div>
                );

            case 'select':
                return (
                    <div key={name} style={fieldStyle}>
                        <label style={labelStyle}>{label}:</label>
                        <select
                            defaultValue={value}
                            style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                );

            case 'textarea':
                return (
                    <div key={name} style={fieldStyle}>
                        <label style={labelStyle}>{label}:</label>
                        <textarea
                            defaultValue={value}
                            style={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    // Render handles
    const renderHandles = () => {
        return handles.map((handle, index) => {
            const {
                type: handleType,
                position,
                id: handleId,
                style: handleStyle = {},
            } = handle;

            const positionMap = {
                Left: Position.Left,
                Right: Position.Right,
                Top: Position.Top,
                Bottom: Position.Bottom,
            };

            return (
                <Handle
                    key={`${handleType}-${handleId || index}`}
                    type={handleType}
                    position={positionMap[position] || Position.Right}
                    id={handleId || `${id}-${handleType}-${index}`}
                    style={{
                        background: nodeColor,
                        width: '10px',
                        height: '10px',
                        border: '2px solid white',
                        ...handleStyle,
                    }}
                />
            );
        });
    };

    return (
        <div style={baseStyle}>
            {renderHandles()}

            {/* Header */}
            <div style={headerStyle}>
                {title}
            </div>

            {/* Content */}
            <div style={contentStyle}>
                {description && (
                    <div style={{ fontSize: '12px', color: COLORS.text.secondary, marginBottom: '8px' }}>
                        {description}
                    </div>
                )}

                {/* Custom content or fields */}
                {customContent ? customContent({ id, data }) : (
                    <>
                        {fields.map(field => renderField(field))}
                    </>
                )}
            </div>
        </div>
    );
};

export default BaseNode;
