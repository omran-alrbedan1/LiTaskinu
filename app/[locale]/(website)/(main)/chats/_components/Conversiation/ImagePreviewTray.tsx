import { Image as AntdImage } from "antd";
import { X } from "lucide-react";

export function ImagePreviewTray({
  previews,
  onRemove,
  ariaPreviewPrefix,
}: {
  previews: string[];
  onRemove: (index: number) => void;
  ariaPreviewPrefix: string;
}) {
  if (previews.length === 0) return null;

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex gap-2 overflow-x-auto">
        {previews.map((preview, index) => (
          <div key={index} className="relative">
            <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <AntdImage
                src={preview}
                alt={`${ariaPreviewPrefix} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => onRemove(index)}
              className="absolute !z-50 top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              aria-label="Remove image"
              type="button"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
