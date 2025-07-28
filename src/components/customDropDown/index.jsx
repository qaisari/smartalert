import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ value, onChange, options, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className="custom-dropdown" ref={ref}>
      <button
        className="dropdown-trigger"
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        {selected ? selected.label : placeholder}
        <svg
          className={`arrow-icon${open ? " flipped" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="dropdown-list">
          {options.map(opt => (
            <li
              key={opt.value}
              className={`dropdown-item${value === opt.value ? " selected" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}