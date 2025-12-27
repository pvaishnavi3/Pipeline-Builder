// submit.js - Enhanced with backend integration

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    // Use individual selectors
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Show alert with results
            setAlertData(data);
            setShowAlert(true);

        } catch (error) {
            let errorMessage = 'An error occurred';

            if (error.name === 'AbortError') {
                errorMessage = 'Request timed out. Is the backend server running?';
            } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
                errorMessage = 'Cannot connect to backend. Please ensure the server is running on http://localhost:8000';
            } else if (error.message.includes('HTTP')) {
                errorMessage = `Server error: ${error.message}`;
            } else {
                errorMessage = `Error: ${error.message}`;
            }

            // Show error alert
            setAlertData({ error: errorMessage });
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertData(null);
    };

    return (
        <>
            <div className="submit-container">
                <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span className="submit-button-loading">
                            <span className="spinner"></span>
                            Analyzing...
                        </span>
                    ) : (
                        '🚀 Submit Pipeline'
                    )}
                </button>
            </div>

            {/* Custom Alert */}
            {showAlert && (
                <>
                    <div className="custom-alert-overlay" onClick={closeAlert}></div>
                    <div className="custom-alert">
                        <div className="custom-alert-title">
                            {alertData?.error ? '❌ Error' : '✅ Pipeline Analysis Results'}
                        </div>
                        <div className="custom-alert-content">
                            {alertData?.error ? (
                                <p style={{ color: '#EF4444', marginBottom: '8px' }}>
                                    {alertData.error}
                                </p>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '24px' }}>📊</span>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                                Number of Nodes: <span style={{ color: '#4F46E5' }}>{alertData?.num_nodes}</span>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '24px' }}>🔗</span>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                                Number of Edges: <span style={{ color: '#4F46E5' }}>{alertData?.num_edges}</span>
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '24px' }}>{alertData?.is_dag ? '✅' : '⚠️'}</span>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                                Is Valid DAG: <span style={{ color: alertData?.is_dag ? '#10B981' : '#EF4444' }}>
                                                    {alertData?.is_dag ? 'Yes' : 'No'}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {!alertData?.is_dag && (
                                        <div style={{
                                            padding: '12px',
                                            background: '#FEF2F2',
                                            borderRadius: '6px',
                                            marginTop: '12px',
                                            border: '1px solid #FEE2E2'
                                        }}>
                                            <p style={{ margin: 0, fontSize: '14px', color: '#991B1B' }}>
                                                ⚠️ Your pipeline contains cycles. A valid DAG should not have any circular dependencies.
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <button className="custom-alert-close" onClick={closeAlert}>
                            Close
                        </button>
                    </div>
                </>
            )}
        </>
    );
};
