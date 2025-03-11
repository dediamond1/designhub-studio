
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  PlusCircle, 
  Image as ImageIcon, 
  Check, 
  X, 
  RotateCw,
  Printer,
  FileType,
  Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PrintDesignPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [designName, setDesignName] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
      
      // Generate preview for the first file
      const fileUrl = URL.createObjectURL(selectedFiles[0]);
      setPreview(fileUrl);
    }
  };
  
  const handleUpload = async () => {
    if (files.length === 0 || !designName) return;
    
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      // Reset form or navigate to next step
      alert('Design uploaded successfully!');
    }, 2000);
  };
  
  const clearFiles = () => {
    setFiles([]);
    setPreview(null);
  };
  
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Custom Print Design</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border border-purple-200 bg-white">
          <CardHeader className="bg-purple-50 border-b border-purple-100">
            <CardTitle>Upload Your Design</CardTitle>
            <CardDescription>
              Upload high-resolution images for your custom prints
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center bg-purple-50/50">
                {preview ? (
                  <div className="space-y-4">
                    <img 
                      src={preview} 
                      alt="Design preview" 
                      className="max-h-48 mx-auto object-contain"
                    />
                    <div className="flex justify-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={clearFiles}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <X className="h-4 w-4 mr-1" /> Remove
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <RotateCw className="h-4 w-4 mr-1" /> Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-purple-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your files here or click to browse
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Select Files
                    </Button>
                  </div>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="design-name">Design Name</Label>
                <Input
                  id="design-name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  placeholder="Enter a name for your design"
                  className="border-purple-200 focus:border-purple-300"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-purple-50/50 border-t border-purple-100">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white" 
              onClick={handleUpload} 
              disabled={files.length === 0 || !designName || uploading}
            >
              {uploading ? (
                <>
                  <RotateCw className="h-4 w-4 mr-2 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" /> Upload Design
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border border-orange-200 bg-white">
          <CardHeader className="bg-orange-50 border-b border-orange-100">
            <CardTitle>Design Guidelines</CardTitle>
            <CardDescription>
              Tips to ensure your print design comes out perfect
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-orange-100 p-1.5 rounded-full">
                  <ImageIcon className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">High Resolution</h3>
                  <p className="text-sm text-gray-600">
                    Use at least 300dpi images for best print quality.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-purple-100 p-1.5 rounded-full">
                  <FileType className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">File Format</h3>
                  <p className="text-sm text-gray-600">
                    We recommend PNG or JPEG files for photos and SVG for graphics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-orange-100 p-1.5 rounded-full">
                  <Palette className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Colors</h3>
                  <p className="text-sm text-gray-600">
                    Use RGB color mode for digital printing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-purple-100 p-1.5 rounded-full">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Size</h3>
                  <p className="text-sm text-gray-600">
                    Ensure your image is sized correctly for the product.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card className="border border-purple-100 bg-gradient-to-b from-white to-purple-50/30">
          <CardHeader>
            <CardTitle>Our Printing Process</CardTitle>
            <CardDescription>
              How we bring your designs to life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white border border-purple-100 rounded-lg text-center hover-lift">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1 text-gray-900">Upload</h3>
                <p className="text-sm text-gray-600">
                  Submit your design files through our system
                </p>
              </div>
              
              <div className="p-6 bg-white border border-orange-100 rounded-lg text-center hover-lift">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-medium mb-1 text-gray-900">Process</h3>
                <p className="text-sm text-gray-600">
                  Our team optimizes your design for printing
                </p>
              </div>
              
              <div className="p-6 bg-white border border-purple-100 rounded-lg text-center hover-lift">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Printer className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1 text-gray-900">Print</h3>
                <p className="text-sm text-gray-600">
                  High-quality printing on your chosen products
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrintDesignPage;
