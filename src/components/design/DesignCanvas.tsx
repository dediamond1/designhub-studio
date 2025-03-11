
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Text, Image, Rect, Circle, Triangle, Polygon } from 'fabric';
import { useDesign } from '../../contexts/DesignContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Define interfaces to extend fabric types with our custom properties
interface CustomFabricObject {
  __designId?: string;
}

interface DesignCanvasProps {
  width: number;
  height: number;
  className?: string;
}

const DesignCanvas: React.FC<DesignCanvasProps> = ({ width, height, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { designState, dispatch } = useDesign();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Initialize canvas once on mount
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: designState.background,
      preserveObjectStacking: true,
      selection: true,
      controlsAboveOverlay: true,
    });

    // Set up event listeners
    fabricCanvas.on('object:moving', (e) => {
      setIsDragging(true);
      handleObjectModified(e);
    });

    fabricCanvas.on('object:scaling', (e) => {
      setIsScaling(true);
      handleObjectModified(e);
    });

    fabricCanvas.on('object:rotating', (e) => {
      setIsRotating(true);
      handleObjectModified(e);
    });

    fabricCanvas.on('mouse:up', () => {
      if (isDragging || isScaling || isRotating) {
        setIsDragging(false);
        setIsScaling(false);
        setIsRotating(false);
        fabricCanvas.renderAll();
      }
    });

    fabricCanvas.on('selection:created', (e) => {
      console.log('Selection created:', e);
    });

    fabricCanvas.on('selection:updated', (e) => {
      console.log('Selection updated:', e);
    });

    fabricCanvas.on('selection:cleared', () => {
      console.log('Selection cleared');
    });

    // Set up keyboard event listeners
    document.addEventListener('keydown', handleKeyDown);

    setCanvas(fabricCanvas);
    setIsLoading(false);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      fabricCanvas.dispose();
    };
  }, []);

  // Handle keyboard shortcuts
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!canvas) return;

    // Delete selected object with Delete or Backspace
    if ((e.key === 'Delete' || e.key === 'Backspace') && canvas.getActiveObject()) {
      deleteSelectedObject();
    }

    // Duplicate with Ctrl+D
    if (e.ctrlKey && e.key === 'd' && canvas.getActiveObject()) {
      e.preventDefault();
      duplicateSelectedObject();
    }

    // Undo with Ctrl+Z
    if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      // Undo functionality would be handled by the DesignContext
    }

    // Redo with Ctrl+Y or Ctrl+Shift+Z
    if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
      e.preventDefault();
      // Redo functionality would be handled by the DesignContext
    }
  };

  // Handle object modifications
  const handleObjectModified = (e: any) => {
    if (!e.target) return;

    const obj = e.target as unknown as CustomFabricObject;
    const id = obj.__designId;

    if (!id) return;

    const updates = {
      x: (obj as any).left || 0,
      y: (obj as any).top || 0,
      width: (obj as any).width || 0,
      height: (obj as any).height || 0,
      rotation: (obj as any).angle || 0,
      scaleX: (obj as any).scaleX || 1,
      scaleY: (obj as any).scaleY || 1,
      opacity: (obj as any).opacity || 1,
    };

    dispatch({
      type: 'UPDATE_OBJECT',
      payload: { id, updates }
    });
  };

  // Delete selected object
  const deleteSelectedObject = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject() as unknown as CustomFabricObject;
    if (!activeObject) return;

    const id = activeObject.__designId;
    if (!id) return;

    canvas.remove(activeObject as any);
    dispatch({ type: 'REMOVE_OBJECT', payload: id });
    toast.success('Object deleted');
  };

  // Duplicate selected object
  const duplicateSelectedObject = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject() as unknown as CustomFabricObject;
    if (!activeObject) return;

    const id = activeObject.__designId;
    if (!id) return;

    // Clone the object through the context
    dispatch({ type: 'DUPLICATE_OBJECT', payload: id });
  };

  // Sync canvas with design state
  useEffect(() => {
    if (!canvas || isLoading) return;

    // Update canvas background
    canvas.backgroundColor = designState.background;
    canvas.renderAll();

    // Clear canvas objects
    canvas.remove(...canvas.getObjects());

    // Add all objects from design state
    designState.objects.forEach(async (obj) => {
      let fabricObj: any = null;

      switch (obj.type) {
        case 'text':
          fabricObj = new Text(obj.content || 'Text', {
            left: obj.x,
            top: obj.y,
            fill: obj.fill,
            fontFamily: obj.fontFamily,
            fontSize: obj.fontSize,
            fontWeight: obj.fontWeight as any,
            angle: obj.rotation,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            opacity: obj.opacity,
          });
          break;

        case 'image':
          if (obj.src) {
            try {
              await new Promise<void>((resolve) => {
                Image.fromURL(obj.src || '', {
                  crossOrigin: 'anonymous',
                  objectCaching: true,
                }).then((img) => {
                  img.set({
                    left: obj.x,
                    top: obj.y,
                    angle: obj.rotation,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY,
                    opacity: obj.opacity,
                  });
                  
                  fabricObj = img;
                  resolve();
                });
              });
            } catch (error) {
              console.error('Error loading image:', error);
            }
          }
          break;

        case 'shape':
          switch (obj.shapeType) {
            case 'rect':
              fabricObj = new Rect({
                left: obj.x,
                top: obj.y,
                width: obj.width,
                height: obj.height,
                fill: obj.fill,
                stroke: obj.stroke,
                strokeWidth: obj.strokeWidth,
                angle: obj.rotation,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                opacity: obj.opacity,
              });
              break;

            case 'circle':
              fabricObj = new Circle({
                left: obj.x,
                top: obj.y,
                radius: Math.min(obj.width, obj.height) / 2,
                fill: obj.fill,
                stroke: obj.stroke,
                strokeWidth: obj.strokeWidth,
                angle: obj.rotation,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                opacity: obj.opacity,
              });
              break;

            case 'triangle':
              fabricObj = new Triangle({
                left: obj.x,
                top: obj.y,
                width: obj.width,
                height: obj.height,
                fill: obj.fill,
                stroke: obj.stroke,
                strokeWidth: obj.strokeWidth,
                angle: obj.rotation,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
                opacity: obj.opacity,
              });
              break;

            case 'polygon':
              // This would be more complex in a real implementation
              fabricObj = new Polygon(
                [
                  { x: 0, y: 0 },
                  { x: 50, y: 0 },
                  { x: 75, y: 50 },
                  { x: 50, y: 100 },
                  { x: 0, y: 100 },
                  { x: -25, y: 50 }
                ],
                {
                  left: obj.x,
                  top: obj.y,
                  fill: obj.fill,
                  stroke: obj.stroke,
                  strokeWidth: obj.strokeWidth,
                  angle: obj.rotation,
                  scaleX: obj.scaleX,
                  scaleY: obj.scaleY,
                  opacity: obj.opacity,
                }
              );
              break;
          }
          break;
      }

      if (fabricObj) {
        // Store the ID in a custom property
        (fabricObj as CustomFabricObject).__designId = obj.id;
        
        // Make objects selectable and movable
        fabricObj.set({
          selectable: true,
          hasControls: true,
          hasBorders: true,
          lockUniScaling: false,
        });

        canvas.add(fabricObj);
      }
    });

    canvas.renderAll();
    setIsInitialized(true);
  }, [canvas, designState.objects, designState.background]);

  // Resize the canvas when width/height props change
  useEffect(() => {
    if (!canvas) return;
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.renderAll();
  }, [canvas, width, height]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`relative border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default DesignCanvas;
