import { useState, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DrawingCanvas, DrawingCanvasRef } from "./DrawingCanvas";
import { DrawingToolbar, DrawingTool } from "./DrawingToolbar";
import { CommentPanel } from "./CommentPanel";

interface ScreenshotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  screenshotUrl: string;
  onSave: (imageData: string, comment: string) => void;
}

export function ScreenshotDialog({
  open,
  onOpenChange,
  screenshotUrl,
  onSave,
}: ScreenshotDialogProps) {
  const canvasRef = useRef<DrawingCanvasRef>(null);
  const [activeTool, setActiveTool] = useState<DrawingTool>("draw");
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState("#ef4444");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleHistoryChange = useCallback((undo: boolean, redo: boolean) => {
    setCanUndo(undo);
    setCanRedo(redo);
  }, []);

  const handleSave = async (comment: string) => {
    if (!canvasRef.current) return;
    
    setIsSaving(true);
    try {
      const imageData = canvasRef.current.getImageData();
      onSave(imageData, comment);
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Screenshot Editor</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Drawing Toolbar */}
          <DrawingToolbar
            activeTool={activeTool}
            onToolChange={setActiveTool}
            brushSize={brushSize}
            onBrushSizeChange={setBrushSize}
            brushColor={brushColor}
            onBrushColorChange={setBrushColor}
            onUndo={() => canvasRef.current?.undo()}
            onRedo={() => canvasRef.current?.redo()}
            onClear={() => canvasRef.current?.clear()}
            canUndo={canUndo}
            canRedo={canRedo}
          />

          {/* Canvas */}
          <div className="flex justify-center bg-muted/30 rounded-lg p-4">
            <DrawingCanvas
              ref={canvasRef}
              imageUrl={screenshotUrl}
              tool={activeTool}
              brushSize={brushSize}
              brushColor={brushColor}
              onHistoryChange={handleHistoryChange}
            />
          </div>

          {/* Comment Panel */}
          <CommentPanel
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
