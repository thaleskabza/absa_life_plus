import { jsx as _jsx } from "react/jsx-runtime";
export default function Card({ children, flat = false, className = '' }) {
    return _jsx("div", { className: `card ${flat ? 'card--flat' : ''} ${className}`, children: children });
}
