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
  description: z.string(),
  linkUrl: z.url(),
  tags: z.array(z.string()),
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
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
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
    if (tagInput.trim() && !currentTags.includes(tagInput.trim())) {
      setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="h-32"
                {...register("description")}
              />
            </div>

            <div className="grid flex-1 gap-2">
              <Label htmlFor="link">Link</Label>
              <Input id="link" {...register("linkUrl")} readOnly={isEditMode} />
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
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
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
