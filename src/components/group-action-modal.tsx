"use client";
import { useState } from "react";
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
import LinkSummaryCard from "./link-summary-card";

type GroupActionModalProps = {
  children: React.ReactNode;
};

export default function GroupActionModal({ children }: GroupActionModalProps) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const handleNext = () => {
    if (step === 2) return;
    setStep((prev) => prev + 1);
  };

  const handleModalTriggerClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
    }, 150);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger onClick={handleModalTriggerClick} asChild>
        {children}
      </DialogTrigger>
      <DialogContent onCloseButton={handleClose} className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>
            Create a new group to share with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col  gap-2">
          {step === 1 && (
            <>
              <div className="grid flex-1 gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" />
              </div>

              <div className="grid flex-1 gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="thumbnail" className="h-50" />
              </div>
            </>
          )}
          {step === 2 && (
            <div>
              <Input placeholder="링크 검색" />
              <div className="w-full h-96  overflow-auto  grid grid-cols-2 gap-5 p-3 mt-10">
                {[1, 2, 3, 4, 5].map((item) => (
                  <LinkSummaryCard
                    key={item}
                    title="lalala1"
                    description="lalalalal2"
                    url="https://www.naver.com"
                    thumbnailUrl=""
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleClose} type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {step === 1 && <Button onClick={handleNext}>Next</Button>}
          {step === 2 && <Button>Create</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
