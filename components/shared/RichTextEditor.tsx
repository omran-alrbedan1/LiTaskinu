"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
  ),
});

import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

const RichTextEditor = React.memo(
  ({
    value,
    onChange,
    placeholder = "Write something...",
    readOnly = false,
    className = "",
  }: RichTextEditorProps) => {
    // React Quill modules configuration
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "list",
      "bullet",
      "align",
      "link",
      "image",
      "video",
      "blockquote",
      "code-block",
    ];

    const editorStyles = `
      .ql-toolbar.ql-snow {
        border: 1px solid #e5e7eb;
        border-bottom: none;
        background: white;
        border-radius: 8px 8px 0 0;
      }
      
      .ql-container.ql-snow {
        border: 1px solid #e5e7eb;
        border-top: none;
        border-radius: 0 0 8px 8px;
        background: white;
        min-height: 200px;
      }
      
      .ql-editor {
        min-height: 200px;
        font-size: 14px;
        color: #374151;
      }
      
      .ql-editor.ql-blank::before {
        color: #9ca3af;
        font-style: normal;
      }
      
      /* Dark mode styles */
      .dark .ql-toolbar.ql-snow {
        border-color: #4b5563;
        background: #1f2937;
      }
      
      .dark .ql-container.ql-snow {
        border-color: #4b5563;
        background: #1f2937;
      }
      
      .dark .ql-editor {
        color: #f3f4f6;
      }
      
      .dark .ql-editor.ql-blank::before {
        color: #9ca3af;
      }
      
      /* Toolbar buttons dark mode */
      .dark .ql-snow .ql-stroke {
        stroke: #f3f4f6;
      }
      
      .dark .ql-snow .ql-fill {
        fill: #f3f4f6;
      }
      
      .dark .ql-snow .ql-picker {
        color: #f3f4f6;
      }
      
      .dark .ql-snow .ql-picker-options {
        background: #1f2937;
        border: 1px solid #4b5563;
      }
      
      .dark .ql-snow .ql-picker-item:hover {
        color: #3b82f6;
      }
      
      /* Fix for picker labels in dark mode */
      .dark .ql-snow .ql-picker-label {
        color: #f3f4f6;
      }
      
      .dark .ql-snow .ql-picker-item {
        color: #f3f4f6;
      }
    `;

    if (readOnly) {
      return (
        <div
          className={`ql-editor p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[200px] prose dark:prose-invert max-w-none ${className}`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }

    return (
      <>
        <style>{editorStyles}</style>
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
          className={`bg-white dark:bg-gray-800 rounded-lg ${className}`}
        />
      </>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export default RichTextEditor;
