
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
  RotateCw 
} from 'lucide-react';

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
      <h1 className="text-3xl font-bold mb-6">Custom Print Design</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Design</CardTitle>
            <CardDescription>
              Upload high-resolution images for your custom prints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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
                      >
                        <X className="h-4 w-4 mr-1" /> Remove
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <RotateCw className="h-4 w-4 mr-1" /> Change
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500 mb-2">
                      Drag and drop your files here or click to browse
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => document.getElementById('file-upload')?.click()}
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
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
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
        
        <Card>
          <CardHeader>
            <CardTitle>Design Guidelines</CardTitle>
            <CardDescription>
              Tips to ensure your print design comes out perfect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">High Resolution</h3>
                  <p className="text-sm text-muted-foreground">
                    Use at least 300dpi images for best print quality.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">File Format</h3>
                  <p className="text-sm text-muted-foreground">
                    We recommend PNG or JPEG files for photos and SVG for graphics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Colors</h3>
                  <p className="text-sm text-muted-foreground">
                    Use RGB color mode for digital printing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Size</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure your image is sized correctly for the product.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Printing Process</CardTitle>
            <CardDescription>
              How we bring your designs to life
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your design files through our system
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Process</h3>
                <p className="text-sm text-muted-foreground">
                  Our team optimizes your design for printing
                </p>
              </div>
              
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Print</h3>
                <p className="text-sm text-muted-foreground">
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
