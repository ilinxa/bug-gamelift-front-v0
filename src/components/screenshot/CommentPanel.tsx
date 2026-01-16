import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";

interface CommentPanelProps {
  onSave: (comment: string) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

export function CommentPanel({ onSave, onCancel, isSaving }: CommentPanelProps) {
  const [comment, setComment] = useState("");

  const handleSave = () => {
    onSave(comment);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-muted/50 rounded-lg border">
      <label className="text-sm font-medium">Add Comment</label>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Describe the issue or feedback..."
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          <X className="h-4 w-4 mr-1" />
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-1" />
          {isSaving ? "Saving..." : "Save Screenshot"}
        </Button>
      </div>
    </div>
  );
}
