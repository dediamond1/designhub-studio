
import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our design state
export type DesignObject = {
  id: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string; // For text
  fontFamily?: string; // For text
  fontSize?: number; // For text
  fontWeight?: string; // For text
  fill?: string; // Color
  stroke?: string; // Border color
  strokeWidth?: number; // Border width
  src?: string; // For images
  shapeType?: 'rect' | 'circle' | 'triangle' | 'polygon'; // For shapes
  opacity?: number;
  scaleX?: number;
  scaleY?: number;
  flipX?: boolean;
  flipY?: boolean;
  zIndex?: number;
};

export type DesignHistoryState = {
  past: DesignState[];
  present: DesignState;
  future: DesignState[];
};

export type DesignState = {
  objects: DesignObject[];
  background: string;
  productType: string;
  productColor: string;
  productSize: string;
  name: string;
  width: number;
  height: number;
  resolution: number;
};

export type DesignAction =
  | { type: 'ADD_OBJECT'; payload: DesignObject }
  | { type: 'UPDATE_OBJECT'; payload: { id: string; updates: Partial<DesignObject> } }
  | { type: 'REMOVE_OBJECT'; payload: string }
  | { type: 'SET_BACKGROUND'; payload: string }
  | { type: 'SET_PRODUCT_TYPE'; payload: string }
  | { type: 'SET_PRODUCT_COLOR'; payload: string }
  | { type: 'SET_PRODUCT_SIZE'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'CLEAR_DESIGN' }
  | { type: 'LOAD_DESIGN'; payload: DesignState }
  | { type: 'MOVE_OBJECT_FORWARD'; payload: string }
  | { type: 'MOVE_OBJECT_BACKWARD'; payload: string }
  | { type: 'DUPLICATE_OBJECT'; payload: string }
  | { type: 'ARRANGE_OBJECTS'; payload: 'front' | 'back' | 'forward' | 'backward'; objectId: string };

// History action types
export type HistoryAction =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'UPDATE'; payload: DesignState };

// Initial state
const initialDesignState: DesignState = {
  objects: [],
  background: '#ffffff',
  productType: 'tshirt',
  productColor: 'white',
  productSize: 'medium',
  name: 'Untitled Design',
  width: 800,
  height: 600,
  resolution: 300
};

// Reducers
const designReducer = (state: DesignState, action: DesignAction): DesignState => {
  switch (action.type) {
    case 'ADD_OBJECT':
      return {
        ...state,
        objects: [...state.objects, action.payload]
      };
    
    case 'UPDATE_OBJECT':
      return {
        ...state,
        objects: state.objects.map(obj => 
          obj.id === action.payload.id 
            ? { ...obj, ...action.payload.updates } 
            : obj
        )
      };
    
    case 'REMOVE_OBJECT':
      return {
        ...state,
        objects: state.objects.filter(obj => obj.id !== action.payload)
      };
    
    case 'SET_BACKGROUND':
      return {
        ...state,
        background: action.payload
      };
    
    case 'SET_PRODUCT_TYPE':
      return {
        ...state,
        productType: action.payload
      };
    
    case 'SET_PRODUCT_COLOR':
      return {
        ...state,
        productColor: action.payload
      };
    
    case 'SET_PRODUCT_SIZE':
      return {
        ...state,
        productSize: action.payload
      };
    
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    
    case 'CLEAR_DESIGN':
      return {
        ...initialDesignState,
        productType: state.productType
      };
    
    case 'LOAD_DESIGN':
      return action.payload;
    
    case 'MOVE_OBJECT_FORWARD': {
      const objects = [...state.objects];
      const index = objects.findIndex(obj => obj.id === action.payload);
      if (index < objects.length - 1) {
        const temp = objects[index];
        objects[index] = objects[index + 1];
        objects[index + 1] = temp;
      }
      return { ...state, objects };
    }
    
    case 'MOVE_OBJECT_BACKWARD': {
      const objects = [...state.objects];
      const index = objects.findIndex(obj => obj.id === action.payload);
      if (index > 0) {
        const temp = objects[index];
        objects[index] = objects[index - 1];
        objects[index - 1] = temp;
      }
      return { ...state, objects };
    }
    
    case 'DUPLICATE_OBJECT': {
      const objectToDuplicate = state.objects.find(obj => obj.id === action.payload);
      if (!objectToDuplicate) return state;
      
      const duplicatedObject: DesignObject = {
        ...objectToDuplicate,
        id: `${objectToDuplicate.id}-copy-${Date.now()}`,
        x: objectToDuplicate.x + 20,
        y: objectToDuplicate.y + 20
      };
      
      return {
        ...state,
        objects: [...state.objects, duplicatedObject]
      };
    }
    
    case 'ARRANGE_OBJECTS': {
      const objects = [...state.objects];
      const index = objects.findIndex(obj => obj.id === action.objectId);
      
      if (index === -1) return state;
      
      const object = objects[index];
      objects.splice(index, 1);
      
      switch (action.payload) {
        case 'front':
          objects.push(object);
          break;
        case 'back':
          objects.unshift(object);
          break;
        case 'forward':
          if (index < objects.length) {
            objects.splice(index + 1, 0, object);
          } else {
            objects.push(object);
          }
          break;
        case 'backward':
          if (index > 0) {
            objects.splice(index - 1, 0, object);
          } else {
            objects.unshift(object);
          }
          break;
      }
      
      return { ...state, objects };
    }
    
    default:
      return state;
  }
};

// History reducer for undo/redo functionality
const historyReducer = (state: DesignHistoryState, action: HistoryAction): DesignHistoryState => {
  switch (action.type) {
    case 'UNDO': {
      if (state.past.length === 0) return state;
      
      const newPast = state.past.slice(0, state.past.length - 1);
      const newPresent = state.past[state.past.length - 1];
      
      return {
        past: newPast,
        present: newPresent,
        future: [state.present, ...state.future]
      };
    }
    
    case 'REDO': {
      if (state.future.length === 0) return state;
      
      const [newPresent, ...newFuture] = state.future;
      
      return {
        past: [...state.past, state.present],
        present: newPresent,
        future: newFuture
      };
    }
    
    case 'UPDATE': {
      if (JSON.stringify(state.present) === JSON.stringify(action.payload)) {
        return state;
      }
      
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: []
      };
    }
    
    default:
      return state;
  }
};

// Initial history state
const initialHistoryState: DesignHistoryState = {
  past: [],
  present: initialDesignState,
  future: []
};

// Type for context value
type DesignContextType = {
  designState: DesignState;
  dispatch: React.Dispatch<DesignAction>;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  saveDesign: () => void;
  loadDesign: (designId: string) => void;
  exportDesign: (format: 'png' | 'pdf' | 'svg') => void;
  addText: (text: string) => void;
  addImage: (imageUrl: string) => void;
  addShape: (shapeType: 'rect' | 'circle' | 'triangle' | 'polygon') => void;
  getPreviewUrl: () => string;
  isDesignEmpty: boolean;
};

// Create the context
export const DesignContext = createContext<DesignContextType | undefined>(undefined);

// Provider component
export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the history reducer to manage the design state with undo/redo capability
  const [historyState, historyDispatch] = useReducer(historyReducer, initialHistoryState);
  
  // Extract current design state from history
  const designState = historyState.present;
  
  // Function to dispatch design actions and update history
  const dispatch = (action: DesignAction) => {
    const updatedState = designReducer(designState, action);
    historyDispatch({ type: 'UPDATE', payload: updatedState });
  };
  
  // Undo and redo functions
  const undo = () => {
    if (historyState.past.length > 0) {
      historyDispatch({ type: 'UNDO' });
      toast.info('Undo successful');
    }
  };
  
  const redo = () => {
    if (historyState.future.length > 0) {
      historyDispatch({ type: 'REDO' });
      toast.info('Redo successful');
    }
  };
  
  // Function to save the current design
  const saveDesign = () => {
    const designData = JSON.stringify(designState);
    
    // In a real app, this would save to a database through an API
    localStorage.setItem(`design_${Date.now()}`, designData);
    toast.success('Design saved successfully!');
  };
  
  // Function to load a design
  const loadDesign = (designId: string) => {
    try {
      // In a real app, this would load from a database through an API
      const designData = localStorage.getItem(designId);
      
      if (designData) {
        const loadedDesign = JSON.parse(designData) as DesignState;
        dispatch({ type: 'LOAD_DESIGN', payload: loadedDesign });
        toast.success('Design loaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to load design');
      console.error('Failed to load design:', error);
    }
  };
  
  // Function to export the design
  const exportDesign = (format: 'png' | 'pdf' | 'svg') => {
    // In a real implementation, this would export the canvas to the selected format
    toast.success(`Exporting design as ${format}...`);
    
    // For demonstration, we'll just simulate the export
    setTimeout(() => {
      toast.success(`Design exported as ${format}`);
    }, 1500);
  };
  
  // Helper function to generate unique IDs
  const generateId = () => `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Function to add text
  const addText = (text: string) => {
    const newText: DesignObject = {
      id: generateId(),
      type: 'text',
      x: designState.width / 2 - 50,
      y: designState.height / 2 - 10,
      width: 100,
      height: 20,
      rotation: 0,
      content: text || 'New Text',
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'normal',
      fill: '#000000',
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    };
    
    dispatch({ type: 'ADD_OBJECT', payload: newText });
  };
  
  // Function to add image
  const addImage = (imageUrl: string) => {
    const newImage: DesignObject = {
      id: generateId(),
      type: 'image',
      x: designState.width / 2 - 50,
      y: designState.height / 2 - 50,
      width: 100,
      height: 100,
      rotation: 0,
      src: imageUrl,
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    };
    
    dispatch({ type: 'ADD_OBJECT', payload: newImage });
  };
  
  // Function to add shape
  const addShape = (shapeType: 'rect' | 'circle' | 'triangle' | 'polygon') => {
    const newShape: DesignObject = {
      id: generateId(),
      type: 'shape',
      x: designState.width / 2 - 50,
      y: designState.height / 2 - 50,
      width: 100,
      height: 100,
      rotation: 0,
      shapeType: shapeType,
      fill: '#e1e1e1',
      stroke: '#000000',
      strokeWidth: 1,
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    };
    
    dispatch({ type: 'ADD_OBJECT', payload: newShape });
  };
  
  // Function to get preview URL (in a real implementation, this would generate a preview image)
  const getPreviewUrl = () => {
    // In a real app, this would generate a preview image
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  };
  
  // Check if the design is empty
  const isDesignEmpty = designState.objects.length === 0;
  
  // Create the context value
  const contextValue: DesignContextType = {
    designState,
    dispatch,
    canUndo: historyState.past.length > 0,
    canRedo: historyState.future.length > 0,
    undo,
    redo,
    saveDesign,
    loadDesign,
    exportDesign,
    addText,
    addImage,
    addShape,
    getPreviewUrl,
    isDesignEmpty
  };
  
  return (
    <DesignContext.Provider value={contextValue}>
      {children}
    </DesignContext.Provider>
  );
};

// Custom hook to use the design context
export const useDesign = (): DesignContextType => {
  const context = useContext(DesignContext);
  
  if (context === undefined) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  
  return context;
};
