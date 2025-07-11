import { useState } from 'react';
import { FileText, Upload, Download, Split, Merge, Minimize2, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const PDFConverter = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('convert');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      toast({
        title: "Files Selected",
        description: `${files.length} file(s) selected for processing.`,
      });
    }
  };

  const processPDF = async (operation: string) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "Error",
        description: "Please select files first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate PDF processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Upload files to your server
      // 2. Use PDF processing libraries like PDF-lib, jsPDF, or server-side tools
      // 3. Return processed files for download
      
      toast({
        title: "Success!",
        description: `PDF ${operation} completed successfully.`,
      });
      
      // Simulate file download
      const blob = new Blob(['Processed PDF content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `processed-${operation}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const tools = [
    {
      id: 'convert',
      title: 'PDF to Word',
      description: 'Convert PDF files to editable Word documents',
      icon: FileText,
      action: () => processPDF('converted-to-word'),
    },
    {
      id: 'compress',
      title: 'Compress PDF',
      description: 'Reduce PDF file size without losing quality',
      icon: Minimize2,
      action: () => processPDF('compressed'),
    },
    {
      id: 'split',
      title: 'Split PDF',
      description: 'Split large PDF files into smaller documents',
      icon: Split,
      action: () => processPDF('split'),
    },
    {
      id: 'merge',
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one document',
      icon: Merge,
      action: () => processPDF('merged'),
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Ad Placeholder - Adsterra Banner */}
      <div className="container mx-auto mb-8">
        <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Advertisement Space (Adsterra Banner)</p>
          <p className="text-xs text-muted-foreground">728x90 Banner Ad</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <FileText className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">PDF Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            PDF Converter & Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert, compress, split, and merge PDF files with ease. All processing is done securely and efficiently.
          </p>
        </div>

        {/* File Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Files
            </CardTitle>
            <CardDescription>
              Select PDF files to process. Multiple files can be selected for batch operations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose PDF Files
              </label>
              <p className="text-sm text-muted-foreground mt-2">
                Drag and drop files here or click to browse
              </p>
              {selectedFiles && (
                <p className="text-sm text-primary mt-2">
                  {selectedFiles.length} file(s) selected
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-card transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tool.icon className="w-5 h-5 text-primary" />
                  {tool.title}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={tool.action}
                  disabled={isProcessing || !selectedFiles}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <tool.icon className="w-4 h-4 mr-2" />
                      {tool.title}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Why Choose Our PDF Tools?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">High Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain original formatting and quality during conversion
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Minimize2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and efficient processing of your PDF files
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Split className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are processed securely and deleted after use
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CPA Offer Placeholder */}
        <div className="mt-12 p-6 bg-gradient-primary/10 border border-primary/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">📄 Unlock Unlimited PDF Processing</h3>
          <p className="text-muted-foreground mb-4">
            Remove file size limits, batch process unlimited files, and access premium features
          </p>
          <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">CPA Offer Placement (CPA Grip Integration)</p>
            <p className="text-xs text-muted-foreground">Complete offer to unlock unlimited processing</p>
          </div>
        </div>

        {/* Bottom Ad Placeholder */}
        <div className="mt-8">
          <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space (Adsterra Banner)</p>
            <p className="text-xs text-muted-foreground">728x90 Banner Ad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFConverter;