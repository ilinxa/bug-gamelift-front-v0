import { Pencil, Type, Eraser, Undo, Redo, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export type DrawingTool = "draw" | "text" | "eraser";

interface DrawingToolbarProps {
  activeTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  brushColor: string;
  onBrushColorChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const colors = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#ffffff", // white
  "#000000", // black
];

export function DrawingToolbar({
  activeTool,
  onToolChange,
  brushSize,
  onBrushSizeChange,
  brushColor,
  onBrushColorChange,
  onUndo,
  onRedo,
  onClear,
  canUndo,
  canRedo,
}: DrawingToolbarProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg border">
      {/* Tools */}
      <div className="flex items-center gap-1">
        <Button
          variant={activeTool === "draw" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolChange("draw")}
          title="Draw (D)"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "text" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolChange("text")}
          title="Text (T)"
        >
          <Type className="h-4 w-4" />
        </Button>
        {/* <Button
          variant={activeTool === "eraser" ? "default" : "ghost"}
          size="icon"
          onClick={() => onToolChange("eraser")}
          title="Eraser (E)"
        >
          <Eraser className="h-4 w-4" />
        </Button> */}
      </div>

      <div className="h-6 w-px bg-border" />

      {/* Colors */}
      <div className="flex items-center gap-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onBrushColorChange(color)}
            className={cn(
              "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
              brushColor === color ? "border-primary scale-110" : "border-transparent"
            )}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div className="h-6 w-px bg-border" />

      {/* Brush Size */}
      <div className="flex items-center gap-2 min-w-[120px]">
        <span className="text-xs text-muted-foreground">Size</span>
        <Slider
          value={[brushSize]}
          onValueChange={([value]) => onBrushSizeChange(value)}
          min={1}
          max={20}
          step={1}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground w-4">{brushSize}</span>
      </div>

      <div className="h-6 w-px bg-border" />

      {/* Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          title="Clear All"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
