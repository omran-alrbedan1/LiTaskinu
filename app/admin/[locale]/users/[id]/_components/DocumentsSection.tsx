import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from ".";
import {
  FaFileAlt,
  FaIdCard,
  FaGraduationCap,
  FaMoneyBillWave,
  FaHome,
  FaHeart,
  FaShieldAlt,
  FaCamera,
  FaEye,
  FaDownload,
} from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

interface Document {
  type: string;
  date: string;
  description?: string;
  files?: string[]; // Array of file URLs
}

interface DocumentsSectionProps {
  documents: Document[];
}

const documentIcons: {
  [key: string]: React.ComponentType<{ className?: string }>;
} = {
  "National ID": FaIdCard,
  "Education Certificate": FaGraduationCap,
  "Income Proof": FaMoneyBillWave,
  "Proof of Residence": FaHome,
  "Marital Status Certificate": FaHeart,
  "Background Check": FaShieldAlt,
  "Recent Photos": FaCamera,
  "Other Documents": FaFileAlt,
};

const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getDocumentIcon = (type: string) => {
    const IconComponent = documentIcons[type] || FaFileAlt;
    return <IconComponent className="w-5 h-5" />;
  };

  const openDocumentView = (doc: Document) => {
    setSelectedDocument(doc);
    if (doc.files && doc.files.length > 0) {
      setSelectedImage(doc.files[0]);
    }
  };

  const closeDocumentView = () => {
    setSelectedDocument(null);
    setSelectedImage(null);
  };

  const downloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <Card className="mt-6 pt-6 ">
        <SectionHeader
          title="User Verification Documents"
          description="Personal details and contact information"
          icon={<FaFileAlt className="w-8 h-8 text-primary-color1" />}
        />

        <CardContent className=" space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-primary-color1 hover:shadow-sm transition-all duration-200 cursor-pointer"
              onClick={() => openDocumentView(doc)}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {doc.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {doc.date ? `Uploaded: ${doc.date}` : "Not uploaded yet"}
                  </div>
                  {doc.files && doc.files.length > 0 && (
                    <div className="text-xs text-blue-600 mt-1">
                      {doc.files.length} file(s) attached
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {doc.files && doc.files.length > 0 && (
                  <button
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDocumentView(doc);
                    }}
                  >
                    <FaEye className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedDocument.type}
                  </h3>
                </div>
              </div>
              <button
                onClick={closeDocumentView}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Document Images */}
                <div>
                  <h4 className="font-medium mb-3">Uploaded Documents</h4>
                  {selectedDocument.files &&
                  selectedDocument.files.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDocument.files.map((file, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="relative aspect-video bg-gray-100">
                            <Image
                              src={file}
                              alt={`${selectedDocument.type} document ${
                                index + 1
                              }`}
                              fill
                              className="object-contain"
                              onError={(e) => {
                                // Fallback for non-image files
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                target.nextElementSibling?.classList.remove(
                                  "hidden"
                                );
                              }}
                            />
                            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                              <FaFileAlt className="w-12 h-12 text-gray-400" />
                              <span className="ml-2 text-gray-600">
                                Document Preview
                              </span>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              Document {index + 1}
                            </span>
                            <button
                              onClick={() =>
                                downloadFile(
                                  file,
                                  `${selectedDocument.type}_${index + 1}`
                                )
                              }
                              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                              <FaDownload className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <FaFileAlt className="w-12 h-12 mx-auto mb-3" />
                      <p>No documents uploaded</p>
                    </div>
                  )}
                </div>

                {/* Document Details */}
                <div>
                  <h4 className="font-medium mb-3">Document Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Upload Date
                      </label>
                      <p className="mt-1 text-sm">
                        {selectedDocument.date || "Not uploaded"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Description
                      </label>
                      <p className="mt-1 text-sm">
                        {selectedDocument.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentsSection;
