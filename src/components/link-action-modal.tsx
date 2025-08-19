import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InlineSpinner } from "./ui/spinner";

type Inputs = {
  title: string;
  description: string;
  linkUrl: string;
  tags: string[];
};

const schema = z.object({
  title: z.string().min(5, "타이틀은 5자 이상이어야 합니다."),
  description: z.string().min(10, "설명은 10자 이상이어야 합니다."),
  linkUrl: z
    .string()
    .min(1, "링크 URL을 입력해주세요.")
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }, "올바른 URL 형식을 입력해주세요. (예: https://example.com)")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "http:// 또는 https://로 시작하는 URL을 입력해주세요."
    ),
  tags: z
    .array(z.string().min(1, "태그는 1자 이상이어야 합니다."))
    .max(10, "태그는 최대 10개까지 추가할 수 있습니다.")
    .refine(
      (tags) => new Set(tags).size === tags.length,
      "중복된 태그는 사용할 수 없습니다."
    ),
});

type LinkActionModalProps = {
  mode: "create" | "edit";
  open: boolean;
  handleClose: () => void;
  initialData?: Inputs;
  isPending?: boolean;
  onSubmit?: (data: Inputs) => void;
};

export default function LinkActionModal({
  mode,
  open,
  handleClose,
  initialData,
  isPending = false,
  onSubmit,
}: LinkActionModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: initialData || {
      title: "",
      linkUrl: "",
      description: "",
      tags: [],
    },
  });

  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    const currentTags = watch("tags");
    const trimmedTag = tagInput.trim();

    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      if (currentTags.length >= 10) {
        alert("태그는 최대 10개까지 추가할 수 있습니다.");
        return;
      }

      if (trimmedTag.length < 1) {
        alert("태그는 1자 이상이어야 합니다.");
        return;
      }

      setValue("tags", [...currentTags, trimmedTag]);
      setTagInput("");
    } else if (currentTags.includes(trimmedTag)) {
      alert("이미 존재하는 태그입니다.");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = watch("tags");
    setValue(
      "tags",
      currentTags.filter((_, i) => i !== index)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleFormSubmit = (data: Inputs) => {
    onSubmit?.(data);
    handleClose();
  };

  const isEditMode = mode === "edit";
  const title = isEditMode ? "Edit Link" : "Create Link";
  const description = isEditMode
    ? "Edit the link information."
    : "Create a new link to share with others.";
  const submitText = isEditMode ? "Update" : "Create";

  const currentTags = watch("tags");

  return (
    <Dialog open={open}>
      <DialogContent onCloseButton={handleClose} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="h-32"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                {...register("linkUrl")}
                placeholder="https://example.com"
              />
              {errors.linkUrl && (
                <p className="text-red-500 text-sm">{errors.linkUrl.message}</p>
              )}
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
                    disabled={currentTags.length >= 10}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    disabled={!tagInput.trim() || currentTags.length >= 10}
                  >
                    Add
                  </Button>
                </div>

                {currentTags.length >= 10 && (
                  <p className="text-amber-600 text-sm">
                    태그는 최대 10개까지 추가할 수 있습니다.
                  </p>
                )}

                {currentTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentTags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.tags && (
                <p className="text-red-500 text-sm">{errors.tags.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleClose} type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <InlineSpinner />}
              {submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
