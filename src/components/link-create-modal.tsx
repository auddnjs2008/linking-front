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

type LinkCreateModalProps = {
  children: React.ReactNode;
};

export default function LinkCreateModal({ children }: LinkCreateModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription>
            Create a new link to share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="thumbnail" className="h-50" />
          </div>

          <div className="grid flex-1 gap-2">
            <Label htmlFor="link">Link</Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
