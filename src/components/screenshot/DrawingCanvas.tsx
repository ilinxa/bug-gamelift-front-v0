import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { DrawingTool } from "./DrawingToolbar";
interface DrawingCanvasProps {
  imageUrl: string;
  tool: DrawingTool;
  brushSize: number;
  brushColor: string;
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void;
}
interface TextInput {
  x: number;
  y: number;
  isActive: boolean;
}
export interface DrawingCanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  getImageData: () => string;
}
export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(({
  imageUrl,
  tool,
  brushSize,
  brushColor,
  onHistoryChange
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [textInput, setTextInput] = useState<TextInput>({
    x: 0,
    y: 0,
    isActive: false
  });
  const [textValue, setTextValue] = useState("");
  const [canvasSize, setCanvasSize] = useState({
    width: 800,
    height: 600
  });
  // Load image and initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log("Loading image:");
    const ctx = canvas?.getContext("2d");
    console.log("Canvas context:");
    if (!canvas || !ctx) return;
    console.log("!canvas || !ctx:");
    const img = new Image();
    console.log("img ok");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      console.log("Image loaded:");
      // Calculate size to fit in container while maintaining aspect ratio
      const maxWidth = 900;
      const maxHeight = 600;
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      const width = img.width * ratio;
      const height = img.height * ratio;
      setCanvasSize({
        width,
        height
      });
      canvas.width = width;
      canvas.height = height;
      console.log("canvas size set");
      ctx.drawImage(img, 0, 0, width, height);
      console.log("Image drawn on canvas");
      
      
      
      // Save initial state
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log("Initial state saved");
      setHistory([initialState]);
      console.log("History updated");
      setHistoryIndex(0);
      console.log("History index set to 0");
      
    };
    
    img.src = imageUrl;
  }, [imageUrl]);

  // Update history change callback
  useEffect(() => {
    onHistoryChange(historyIndex > 0, historyIndex < history.length - 1);
  }, [historyIndex, history.length, onHistoryChange]);
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);

    // Limit history to 50 states
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const newIndex = historyIndex - 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);
  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const newIndex = historyIndex + 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);
  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || history.length === 0) return;
    ctx.putImageData(history[0], 0, 0);
    setHistory([history[0]]);
    setHistoryIndex(0);
  }, [history]);
  const getImageData = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas?.toDataURL("image/png") || "";
  }, []);
  useImperativeHandle(ref, () => ({
    undo,
    redo,
    clear,
    getImageData
  }));
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return {
      x: 0,
      y: 0
    };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "text") {
      const {
        x,
        y
      } = getCoordinates(e);
      setTextInput({
        x,
        y,
        isActive: true
      });
      setTextValue("");
      return;
    }
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const {
      x,
      y
    } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === "text") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const {
      x,
      y
    } = getCoordinates(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = brushColor;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
  };
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };
  const addText = () => {
    if (!textValue.trim() || !textInput.isActive) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.font = `${brushSize + 12}px sans-serif`;
    ctx.fillStyle = brushColor;
    ctx.fillText(textValue, textInput.x, textInput.y);
    setTextInput({
      x: 0,
      y: 0,
      isActive: false
    });
    setTextValue("");
    saveState();
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (textInput.isActive && e.key === "Enter") {
      e.preventDefault();
      addText();
    }
    if (textInput.isActive && e.key === "Escape") {
      setTextInput({
        x: 0,
        y: 0,
        isActive: false
      });
      setTextValue("");
    }
  };
  return <div ref={containerRef} className="relative inline-block">
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} style={{
      width: canvasSize.width,
      height: canvasSize.height
    }} className="rounded-lg border  cursor-crosshair" />
        
        {/* Text input overlay */}
        {textInput.isActive && <input type="text" value={textValue} onChange={e => setTextValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={addText} autoFocus className="absolute bg-transparent border-b-2 border-primary outline-none text-white" style={{
      left: textInput.x,
      top: textInput.y - 20,
      fontSize: brushSize + 12,
      color: brushColor,
      minWidth: 100
    }} placeholder="Type here..." />}
      </div>;
});
DrawingCanvas.displayName = "DrawingCanvas";