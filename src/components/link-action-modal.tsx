import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

type LinkData = {
  title: string;
  description: string;
  url: string;
  tags: string[];
};

type LinkActionModalProps = {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: LinkData;
  onSubmit?: (data: LinkData) => void;
};

export default function LinkActionModal({
  children,
  mode,
  initialData,
  onSubmit,
}: LinkActionModalProps) {
  const [formData, setFormData] = useState<LinkData>({
    title: "",
    description: "",
    url: "",
    tags: [],
  });
  const [tagInput, setTagInput] = useState("");

  // 초기 데이터가 있으면 폼에 설정
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Link" : "Create Link";
  const description = isEditMode
    ? "Edit the link information."
    : "Create a new link to share with others.";
  const submitText = isEditMode ? "Update" : "Create";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="h-32"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              readOnly={isEditMode} // 수정 모드에서는 URL 변경 불가
            />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Enter a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addTag}
                  disabled={!tagInput.trim()}
                >
                  Add
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
