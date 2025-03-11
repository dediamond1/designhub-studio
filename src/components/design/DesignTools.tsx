
import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Type, 
  Image as ImageIcon, 
  Square, 
  Circle, 
  Triangle, 
  Hexagon, 
  Palette, 
  Upload, 
  Trash2, 
  Copy, 
  Layers, 
  ChevronUp, 
  ChevronDown, 
  Save, 
  Download, 
  RotateCcw, 
  RotateCw, 
  Maximize, 
  Minimize,
  Undo,
  Redo,
  Lock,
  Unlock,
  FlipHorizontal,
  FlipVertical,
  Sliders
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDesign } from '../../contexts/DesignContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const DesignTools: React.FC = () => {
  const { 
    designState, 
    dispatch, 
    addText, 
    addImage, 
    addShape, 
    undo, 
    redo, 
    canUndo, 
    canRedo,
    saveDesign,
    exportDesign
  } = useDesign();
  
  const [activeTab, setActiveTab] = useState('elements');
  const [textInput, setTextInput] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [opacity, setOpacity] = useState(100);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Font families list
  const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
    'Comic Sans MS',
    'Impact',
    'Tahoma',
    'Trebuchet MS'
  ];
  
  // Shape presets
  const shapes = [
    { name: 'Rectangle', type: 'rect', icon: <Square className="h-5 w-5" /> },
    { name: 'Circle', type: 'circle', icon: <Circle className="h-5 w-5" /> },
    { name: 'Triangle', type: 'triangle', icon: <Triangle className="h-5 w-5" /> },
    { name: 'Polygon', type: 'polygon', icon: <Hexagon className="h-5 w-5" /> },
  ];
  
  // Pre-defined colors
  const colorPresets = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff',
    '#0080ff', '#ff0080', '#80ff00', '#008080', '#800080',
  ];
  
  // Handle text add
  const handleAddText = () => {
    addText(textInput || 'New Text');
    setTextInput('');
    toast.success('Text added to design');
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingImage(true);
    
    // Create a local URL for the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      addImage(imageUrl);
      setUploadingImage(false);
      toast.success('Image added to design');
    };
    
    reader.onerror = () => {
      setUploadingImage(false);
      toast.error('Failed to load image');
    };
    
    reader.readAsDataURL(file);
  };
  
  // Handle shape add
  const handleAddShape = (shapeType: 'rect' | 'circle' | 'triangle' | 'polygon') => {
    addShape(shapeType);
    toast.success(`${shapeType} shape added to design`);
  };
  
  // Handle background color change
  const handleBackgroundChange = (color: string) => {
    dispatch({ type: 'SET_BACKGROUND', payload: color });
  };
  
  // Handle font size change
  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
    // In a real implementation, this would update the selected text object
  };
  
  // Handle opacity change
  const handleOpacityChange = (value: number) => {
    setOpacity(value);
    // In a real implementation, this would update the selected object
  };
  
  // Handle export
  const handleExport = (format: 'png' | 'pdf' | 'svg') => {
    exportDesign(format);
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <div className="flex space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={undo}
            disabled={!canUndo}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={redo}
            disabled={!canRedo}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
          
          <div className="h-6 mx-1 border-l border-gray-200"></div>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => saveDesign()}
            title="Save Design"
          >
            <Save className="h-4 w-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                title="Export Design"
              >
                <Download className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="grid gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start"
                  onClick={() => handleExport('png')}
                >
                  PNG Image
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start"
                  onClick={() => handleExport('pdf')}
                >
                  PDF Document
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="justify-start"
                  onClick={() => handleExport('svg')}
                >
                  SVG Vector
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex space-x-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" title="Background Color">
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-5 gap-1 mb-2">
                {colorPresets.map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded cursor-pointer border hover:scale-110 transition-transform",
                      color === '#ffffff' ? "border-gray-200" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleBackgroundChange(color)}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-8 h-8 cursor-pointer"
                />
                <Input
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleBackgroundChange(currentColor)}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs defaultValue="elements" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 p-0 rounded-none border-b border-gray-200">
          <TabsTrigger value="elements" className="rounded-none data-[state=active]:bg-gray-50">
            <Layers className="h-4 w-4 mr-2" />
            Elements
          </TabsTrigger>
          <TabsTrigger value="text" className="rounded-none data-[state=active]:bg-gray-50">
            <Type className="h-4 w-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="images" className="rounded-none data-[state=active]:bg-gray-50">
            <ImageIcon className="h-4 w-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="objects" className="rounded-none data-[state=active]:bg-gray-50">
            <Sliders className="h-4 w-4 mr-2" />
            Properties
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="elements" className="p-4 max-h-[400px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {shapes.map((shape) => (
              <Button
                key={shape.type}
                variant="outline"
                className="h-16 flex flex-col gap-1 justify-center"
                onClick={() => handleAddShape(shape.type as any)}
              >
                {shape.icon}
                <span className="text-xs">{shape.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Templates</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                >
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    Template {i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Enter text..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddText}>Add</Button>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Font Family</h3>
              <select className="w-full p-2 border rounded-md">
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Font Size</h3>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[fontSize]}
                  onValueChange={(values) => handleFontSizeChange(values[0])}
                  min={8}
                  max={72}
                  step={1}
                />
                <span className="min-w-[40px] text-center">{fontSize}px</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Text Style</h3>
              <div className="flex space-x-1">
                <Button variant="outline" size="icon" title="Bold">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Italic">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Align Left">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Align Center">
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Align Right">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Text Color</h3>
              <div className="grid grid-cols-5 gap-1">
                {colorPresets.slice(0, 10).map((color) => (
                  <div
                    key={color}
                    className={cn(
                      "w-8 h-8 rounded cursor-pointer border hover:scale-110 transition-transform",
                      color === '#ffffff' ? "border-gray-200" : "border-transparent"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Text Presets</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => addText('Your Logo Here')}>
                  Company Name
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => addText('Add a slogan here')}>
                  Slogan/Tagline
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => addText('www.yourwebsite.com')}>
                  Website URL
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => addText('+1 (123) 456-7890')}>
                  Phone Number
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {uploadingImage ? (
                  <RotateCw className="h-8 w-8 text-gray-400 animate-spin" />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
                <span className="mt-2 text-sm text-gray-500">
                  {uploadingImage ? 'Uploading...' : 'Upload an image or drag and drop'}
                </span>
              </label>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Stock Images</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-primary transition-colors"
                  >
                    <img
                      src={`https://source.unsplash.com/random/100x100?sig=${i}`}
                      alt={`Stock image ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Your Uploads</h3>
              <div className="border rounded-md p-4 flex items-center justify-center h-24 text-gray-400 text-sm">
                Your uploaded images will appear here
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="objects" className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Opacity</h3>
              <div className="flex items-center space-x-2">
                <Slider
                  value={[opacity]}
                  onValueChange={(values) => handleOpacityChange(values[0])}
                  min={0}
                  max={100}
                  step={1}
                />
                <span className="min-w-[40px] text-center">{opacity}%</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Transformations</h3>
              <div className="flex flex-wrap gap-1">
                <Button variant="outline" size="icon" title="Rotate Left">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Rotate Right">
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Flip Horizontal">
                  <FlipHorizontal className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Flip Vertical">
                  <FlipVertical className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Bring Forward">
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Send Backward">
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Lock Object">
                  <Lock className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Duplicate">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" title="Delete" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Position & Size</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">X Position</label>
                  <Input type="number" placeholder="X" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Y Position</label>
                  <Input type="number" placeholder="Y" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Width</label>
                  <Input type="number" placeholder="W" />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Height</label>
                  <Input type="number" placeholder="H" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Effects</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-gray-500">Shadow</label>
                  <div className="flex space-x-2">
                    <Input type="number" placeholder="Blur" className="w-20" />
                    <Input type="number" placeholder="X" className="w-16" />
                    <Input type="number" placeholder="Y" className="w-16" />
                    <input
                      type="color"
                      value="#000000"
                      className="w-8 h-8 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-500">Border</label>
                  <div className="flex space-x-2">
                    <Input type="number" placeholder="Width" className="w-20" />
                    <input
                      type="color"
                      value="#000000"
                      className="w-8 h-8 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignTools;
