import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, File } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/utils/verification-utils";
const DocumentViewerModal: React.FC<{
  document: any;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (document: Document) => void;
}> = ({ document, isOpen, onClose, onDownload }) => {
  if (!isOpen || !document) return null;

  const handleViewInBrowser = () => {
    // Open PDF in new tab/window - browser will handle it with default PDF viewer
    window.open(document.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl max-h-[90vh] w-full animate-in zoom-in-95">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {document.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formatDate(document.uploadedAt)} •{" "}
              {document.fileType.toUpperCase()}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ✕
          </Button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-auto flex items-center justify-center">
          {document.fileType === "image" ? (
            <Image
              src={document.previewUrl}
              alt={document.name}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-xl shadow-lg"
            />
          ) : (
            // PDF View - Show preview and option to open in browser
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <File className="w-16 h-16 text-red-500 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                PDF Document
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                This is a PDF document. Click "Open PDF" to view it in your
                browser's PDF viewer.
              </p>
              <Button
                onClick={handleViewInBrowser}
                className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <ZoomIn className="w-4 h-4" />
                Open PDF in Browser
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => onDownload(document)}
            className="gap-2 rounded-lg"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          {document.fileType === "pdf" && (
            <Button
              onClick={handleViewInBrowser}
              className="gap-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              <ZoomIn className="w-4 h-4" />
              Open PDF
            </Button>
          )}
          <Button onClick={onClose} className="rounded-lg">
            Close Viewer
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DocumentViewerModal;
