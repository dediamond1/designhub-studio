
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Text, Image, Rect, Circle, Triangle, Polygon, Line, Group } from 'fabric';
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
  const [zoom, setZoom] = useState(1);

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
      centeredScaling: true,
      centeredRotation: true,
      selectionBorderColor: '#2563eb',
      selectionColor: 'rgba(37, 99, 235, 0.1)',
      selectionLineWidth: 1,
    });

    // Set up grid background (optional, can be toggled)
    const gridSize = 20;
    const canvasWidth = width;
    const canvasHeight = height;
    
    // Create grid lines as background
    const createGrid = () => {
      const gridGroup = [];
      
      // Create horizontal lines
      for (let i = 0; i < canvasHeight / gridSize; i++) {
        const line = new Line([0, i * gridSize, canvasWidth, i * gridSize], {
          stroke: '#e5e7eb',
          selectable: false,
          evented: false,
          strokeWidth: 0.5,
        });
        gridGroup.push(line);
      }
      
      // Create vertical lines
      for (let i = 0; i < canvasWidth / gridSize; i++) {
        const line = new Line([i * gridSize, 0, i * gridSize, canvasHeight], {
          stroke: '#e5e7eb',
          selectable: false,
          evented: false,
          strokeWidth: 0.5,
        });
        gridGroup.push(line);
      }
      
      const group = new Group(gridGroup, {
        selectable: false,
        evented: false,
      });
      
      // Add a custom property to identify this as a grid
      (group as any).isGrid = true;
      
      return group;
    };
    
    const grid = createGrid();
    fabricCanvas.add(grid);
    // Send grid to back using the correct method
    grid.sendToBack();
    fabricCanvas.renderAll();

    // Set up event listeners
    fabricCanvas.on('object:moving', (e: any) => {
      setIsDragging(true);
      handleObjectModified(e);
    });

    fabricCanvas.on('object:scaling', (e: any) => {
      setIsScaling(true);
      handleObjectModified(e);
    });

    fabricCanvas.on('object:rotating', (e: any) => {
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

    fabricCanvas.on('selection:created', (e: any) => {
      updateToolbarWithSelection(e.selected);
    });

    fabricCanvas.on('selection:updated', (e: any) => {
      updateToolbarWithSelection(e.selected);
    });

    fabricCanvas.on('selection:cleared', () => {
      // Reset toolbar state when selection is cleared
      dispatch({ type: 'SET_SELECTED_OBJECT', payload: null });
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

  // Update toolbar with selected object properties
  const updateToolbarWithSelection = (selected: any[]) => {
    if (!selected || selected.length === 0) return;
    
    const obj = selected[0] as any;
    const designId = (obj as CustomFabricObject).__designId;
    
    if (!designId) return;
    
    const designObject = designState.objects.find(o => o.id === designId);
    if (designObject) {
      dispatch({ type: 'SET_SELECTED_OBJECT', payload: designObject });
    }
  };

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
      dispatch({ type: 'UNDO' });
    }

    // Redo with Ctrl+Y or Ctrl+Shift+Z
    if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
      e.preventDefault();
      dispatch({ type: 'REDO' });
    }

    // Group objects with Ctrl+G
    if (e.ctrlKey && e.key === 'g' && canvas.getActiveObject() && canvas.getActiveObject().type === 'activeSelection') {
      e.preventDefault();
      groupSelectedObjects();
    }

    // Ungroup objects with Ctrl+Shift+G
    if (e.ctrlKey && e.shiftKey && e.key === 'g' && canvas.getActiveObject() && canvas.getActiveObject().type === 'group') {
      e.preventDefault();
      ungroupSelectedObjects();
    }
  };

  // Group selected objects
  const groupSelectedObjects = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject() as any;
    if (!activeObject || activeObject.type !== 'activeSelection') return;
    
    const group = activeObject.toGroup();
    const designId = `group_${uuidv4()}`;
    (group as CustomFabricObject).__designId = designId;
    
    canvas.setActiveObject(group);
    canvas.renderAll();
    
    // Create a new group object in the design state
    const groupObj = {
      id: designId,
      type: 'group' as any,
      x: group.left || 0,
      y: group.top || 0,
      width: group.width || 0,
      height: group.height || 0,
      rotation: group.angle || 0,
      scaleX: group.scaleX || 1,
      scaleY: group.scaleY || 1,
      opacity: group.opacity || 1,
    };
    
    // Add the group to design state
    dispatch({ type: 'ADD_OBJECT', payload: groupObj });
    
    // Remove the individual objects from design state (optional, depends on your implementation)
    // For a real implementation, you might want to keep track of which objects are in the group
  };

  // Ungroup selected objects
  const ungroupSelectedObjects = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject() as any;
    if (!activeObject || activeObject.type !== 'group') return;
    
    const designId = (activeObject as CustomFabricObject).__designId;
    const items = activeObject.getObjects();
    activeObject.destroy();
    
    canvas.remove(activeObject);
    
    // Add each item back to canvas individually
    items.forEach((item: any) => {
      canvas.add(item);
      const newId = `object_${uuidv4()}`;
      (item as CustomFabricObject).__designId = newId;
      
      // Create new design objects for each item
      const itemObj = {
        id: newId,
        type: determineObjectType(item),
        x: item.left || 0,
        y: item.top || 0,
        width: item.width || 0,
        height: item.height || 0,
        rotation: item.angle || 0,
        scaleX: item.scaleX || 1,
        scaleY: item.scaleY || 1,
        opacity: item.opacity || 1,
        fill: item.fill || null,
        stroke: item.stroke || null,
        strokeWidth: item.strokeWidth || 0,
      };
      
      dispatch({ type: 'ADD_OBJECT', payload: itemObj });
    });
    
    canvas.renderAll();
    
    // Remove the group object from design state
    if (designId) {
      dispatch({ type: 'REMOVE_OBJECT', payload: designId });
    }
  };

  // Helper function to determine object type
  const determineObjectType = (fabricObj: any): 'text' | 'image' | 'shape' => {
    if (fabricObj instanceof Text) return 'text';
    if (fabricObj instanceof Image) return 'image';
    return 'shape';
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

  // Zoom controls
  const handleZoomIn = () => {
    if (!canvas || zoom >= 3) return; // Limit max zoom
    
    const newZoom = zoom + 0.1;
    canvas.setZoom(newZoom);
    setZoom(newZoom);
  };
  
  const handleZoomOut = () => {
    if (!canvas || zoom <= 0.5) return; // Limit min zoom
    
    const newZoom = zoom - 0.1;
    canvas.setZoom(newZoom);
    setZoom(newZoom);
  };

  // Sync canvas with design state
  useEffect(() => {
    if (!canvas || isLoading) return;

    // Update canvas background
    canvas.backgroundColor = designState.background;
    canvas.renderAll();

    // Clear canvas objects
    const objectsToRemove = canvas.getObjects().filter(obj => {
      // Don't remove the grid background
      return !(obj as any).isGrid;
    });
    canvas.remove(...objectsToRemove);

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
            charSpacing: 0,
            textAlign: 'left',
            stroke: obj.stroke,
            strokeWidth: obj.strokeWidth,
          });
          break;

        case 'image':
          if (obj.src) {
            try {
              await new Promise<void>((resolve) => {
                // Use proper loader for images without invalid properties
                Image.fromURL(obj.src || '', {
                  crossOrigin: 'anonymous',
                }, (img) => {
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
                rx: 0,
                ry: 0,
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
        // Store the ID in a custom property and cast properly
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
    <div className="relative border border-gray-100 rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="bg-gray-50 p-1 border-b border-gray-100 flex justify-between items-center">
        <div className="flex space-x-1">
          <button 
            className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded"
            onClick={handleZoomOut}
          >
            -
          </button>
          <span className="px-2 py-1 text-xs font-medium">{Math.round(zoom * 100)}%</span>
          <button 
            className="px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 rounded"
            onClick={handleZoomIn}
          >
            +
          </button>
        </div>
        <div>
          <span className="text-xs text-gray-500">
            {width} × {height}px
          </span>
        </div>
      </div>
      <div className="canvas-wrapper overflow-auto p-4 bg-gray-50 flex items-center justify-center">
        <div className="canvas-container drop-shadow-sm" style={{ width, height }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default DesignCanvas;
