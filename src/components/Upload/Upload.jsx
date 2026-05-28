import React, { useRef, useState } from "react";
import "./Upload.css";

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/**
 * File upload with drag-and-drop and a file-list preview.
 * Uncontrolled by default; pass `files` + `onChange` to control.
 *
 *   <Upload accept="image/*,.pdf" multiple onChange={files => …} />
 */
export function Upload({
  label,
  hint = "PNG, JPG or PDF up to 10 MB",
  accept,
  multiple = false,
  files: controlledFiles,
  onChange,
  error,
  disabled = false,
  className = "",
}) {
  const inputRef = useRef(null);
  const [internal, setInternal] = useState([]);
  const [dragging, setDragging] = useState(false);
  const isControlled = controlledFiles !== undefined;
  const files = isControlled ? controlledFiles : internal;

  const setFiles = (next) => {
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  };

  const handleSelect = (list) => {
    const arr = Array.from(list || []);
    setFiles(multiple ? [...files, ...arr] : arr.slice(0, 1));
  };

  const remove = (file) => {
    setFiles(files.filter((f) => f !== file));
  };

  const dropCls = [
    "sx-upload__drop",
    dragging && "is-dragging",
    error && "is-error",
  ].filter(Boolean).join(" ");

  return (
    <div className={"sx-upload " + className}>
      {label && <span className="sx-field__label">{label}</span>}
      <label
        className={dropCls}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (disabled) return;
          handleSelect(e.dataTransfer.files);
        }}
      >
        <span className="material-symbols-rounded sx-upload__icon" aria-hidden="true">cloud_upload</span>
        <span className="sx-upload__primary">
          <span className="sx-upload__link">Click to upload</span> or drag and drop
        </span>
        <span className="sx-upload__hint">{hint}</span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleSelect(e.target.files)}
        />
      </label>
      {error && <span className="sx-field__helper is-error">{error}</span>}
      {files.length > 0 && (
        <div className="sx-upload__list">
          {files.map((file, i) => (
            <div key={i} className="sx-upload__file">
              <span className="material-symbols-rounded sx-upload__file-icon" aria-hidden="true">description</span>
              <span className="sx-upload__file-name">{file.name}</span>
              <span className="sx-upload__file-size">{formatBytes(file.size)}</span>
              <button type="button" className="sx-upload__file-remove" onClick={() => remove(file)} aria-label={`Remove ${file.name}`}>
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
