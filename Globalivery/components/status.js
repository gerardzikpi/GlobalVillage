import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * Status component
 *
 * Usage:
 * <Status
 *   orderId="123"
 *   status={optionalCurrentStatusObject}
 *   history={optionalArrayOfStatusObjects}
 *   onRefresh={() => {}}
 *   onSelect={(historyItem) => {}}
 * />
 *
 * A status object shape:
 * { id: string|number, state: "pending"|"shipped"|"delivered"|..., note: string, updatedAt: ISOString }
 *
 * If neither `status` nor `history` are provided the component will show example data.
 */

const containerStyle = {
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    maxWidth: 720,
    margin: "0 auto",
    padding: 16,
    color: "#222",
};

const cardStyle = {
    borderRadius: 8,
    border: "1px solid #e6e6e6",
    padding: 14,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
    marginBottom: 12,
};

const headerStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const titleStyle = { margin: 0, fontSize: 18, fontWeight: 600 };
const smallStyle = { color: "#666", fontSize: 12 };

const listStyle = { listStyle: "none", padding: 0, margin: "8px 0 0 0" };
const listItemStyle = (selected) => ({
    ...cardStyle,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    background: selected ? "#f5faff" : "#fff",
    borderColor: selected ? "#cfe7ff" : "#e6e6e6",
});

function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString();
}

export default function Status({ orderId, status: initialStatus, history: initialHistory, onRefresh, onSelect }) {
    const [status, setStatus] = useState(initialStatus || null);
    const [history, setHistory] = useState(initialHistory || []);
    const [loading, setLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Provide example data if none supplied (useful in new file / dev)
    useEffect(() => {
        if (initialStatus || (initialHistory && initialHistory.length)) {
            setStatus(initialStatus || null);
            setHistory(initialHistory || []);
            return;
        }

        const example = {
            current: {
                id: "s-3",
                state: "Out for delivery",
                note: "Courier has your package and will arrive today between 2–5pm.",
                updatedAt: new Date().toISOString(),
            },
            history: [
                { id: "s-1", state: "Order placed", note: "We received the order.", updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
                { id: "s-2", state: "Packed", note: "Order packed at warehouse.", updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() },
            ],
        };

        setStatus(example.current);
        setHistory(example.history);
    }, [initialStatus, initialHistory]);

    // Example fetch function - uncomment and adapt if you want real network calls
    // useEffect(() => {
    //   if (!orderId) return;
    //   setLoading(true);
    //   fetch(`/api/orders/${orderId}/status`)
    //     .then(r => r.json())
    //     .then(data => {
    //       setStatus(data.current);
    //       setHistory(data.history || []);
    //     })
    //     .catch(() => {})
    //     .finally(() => setLoading(false));
    // }, [orderId]);

    function handleRefresh() {
        if (typeof onRefresh === "function") {
            onRefresh();
            return;
        }
        // Default: simulate update
        setLoading(true);
        setTimeout(() => {
            const now = new Date().toISOString();
            const newStatus = {
                id: `s-${Date.now()}`,
                state: "Updated",
                note: "Status refreshed.",
                updatedAt: now,
            };
            setHistory((h) => [ ...(status ? [status] : []), ...h ]);
            setStatus(newStatus);
            setLoading(false);
        }, 600);
    }

    function handleSelect(item) {
        setSelectedId(item.id);
        if (typeof onSelect === "function") onSelect(item);
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h3 style={titleStyle}>Order status</h3>
                    <div>
                        <button onClick={handleRefresh} disabled={loading} aria-label="Refresh status" style={{ marginRight: 8 }}>
                            {loading ? "Refreshing…" : "Refresh"}
                        </button>
                        {orderId && <span style={smallStyle}>Order #{orderId}</span>}
                    </div>
                </div>

                {status ? (
                    <div style={{ marginTop: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>{status.state}</div>
                                {status.note && <div style={{ marginTop: 6, color: "#333" }}>{status.note}</div>}
                            </div>
                            <div style={{ textAlign: "right", marginLeft: 12 }}>
                                <div style={smallStyle}>{formatDate(status.updatedAt)}</div>
                                <div style={{ color: "#888", fontSize: 12 }}>{status.id}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ marginTop: 12, color: "#666" }}>No current status available.</div>
                )}
            </div>

            <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <h4 style={{ margin: 0 }}>History</h4>
                    <div style={smallStyle}>{history.length} item{history.length !== 1 ? "s" : ""}</div>
                </div>

                {history.length === 0 ? (
                    <div style={cardStyle}>No history available.</div>
                ) : (
                    <ul style={listStyle}>
                        {history.map((h) => (
                            <li
                                key={h.id}
                                onClick={() => handleSelect(h)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(h)}
                                style={listItemStyle(selectedId === h.id)}
                                aria-pressed={selectedId === h.id}
                            >
                                <div>
                                    <div style={{ fontWeight: 600 }}>{h.state}</div>
                                    {h.note && <div style={{ color: "#444", marginTop: 4 }}>{h.note}</div>}
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={smallStyle}>{formatDate(h.updatedAt)}</div>
                                    <div style={{ color: "#888", fontSize: 12 }}>{h.id}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

Status.propTypes = {
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        state: PropTypes.string,
        note: PropTypes.string,
        updatedAt: PropTypes.string,
    }),
    history: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            state: PropTypes.string,
            note: PropTypes.string,
            updatedAt: PropTypes.string,
        })
    ),
    onRefresh: PropTypes.func,
    onSelect: PropTypes.func,
};