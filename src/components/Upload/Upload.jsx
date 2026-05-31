import React, { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button.jsx";
import "./Upload.css";

function formatBytes(n) {
  if (n == null) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function isImageFile(file) {
  if (!file) return false;
  if (typeof file.type === "string" && file.type.startsWith("image/")) return true;
  const name = file.name || "";
  return /\.(png|jpe?g|gif|webp|svg|avif|bmp)$/i.test(name);
}

/** Resolve a preview image URL for an image file. Accepts a pre-supplied
 *  `preview`/`url` (e.g. for prefilled stories) or creates an object URL. */
function FilePreview({ file }) {
  const [url, setUrl] = useState(file.preview || file.url || null);
  useEffect(() => {
    if (file.preview || file.url) { setUrl(file.preview || file.url); return; }
    if (typeof File !== "undefined" && file instanceof Blob && typeof URL !== "undefined" && URL.createObjectURL) {
      const objUrl = URL.createObjectURL(file);
      setUrl(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
    setUrl(null);
  }, [file]);

  if (url) {
    return <img className="sx-upload__thumb" src={url} alt="" aria-hidden="true" />;
  }
  return (
    <span className="sx-upload__thumb sx-upload__thumb--placeholder" aria-hidden="true">
      <span className="material-symbols-rounded">image</span>
    </span>
  );
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
  const replaceRef = useRef(null);
  const replaceIndexRef = useRef(null);
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

  // Replace a single file in place via a scoped file picker.
  const startReplace = (index) => {
    if (disabled) return;
    replaceIndexRef.current = index;
    replaceRef.current && replaceRef.current.click();
  };
  const handleReplace = (list) => {
    const arr = Array.from(list || []);
    const idx = replaceIndexRef.current;
    replaceIndexRef.current = null;
    if (idx == null || !arr.length) return;
    const next = files.slice();
    next[idx] = arr[0];
    setFiles(next);
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
      {/* Scoped, hidden picker used by per-file "Replace". */}
      <input
        ref={replaceRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sx-upload__replace-input"
        onChange={(e) => { handleReplace(e.target.files); e.target.value = ""; }}
      />
      {files.length > 0 && (
        <div className="sx-upload__list">
          {files.map((file, i) => (
            <div key={i} className="sx-upload__file">
              {isImageFile(file) ? (
                <FilePreview file={file} />
              ) : (
                <span className="sx-upload__thumb sx-upload__thumb--placeholder" aria-hidden="true">
                  <span className="material-symbols-rounded">description</span>
                </span>
              )}
              <span className="sx-upload__file-meta">
                <span className="sx-upload__file-name">{file.name}</span>
                <span className="sx-upload__file-size">{formatBytes(file.size)}</span>
              </span>
              <span className="sx-upload__file-actions">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={disabled}
                  onClick={() => startReplace(i)}
                >
                  Replace
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  disabled={disabled}
                  onClick={() => remove(file)}
                  aria-label={`Remove ${file.name}`}
                >
                  Remove
                </Button>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
