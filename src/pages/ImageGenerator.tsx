import { useState, useEffect } from 'react';
import { Image, Download, Wand2, Palette, Key, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { RunwareService, GenerateImageParams } from '@/services/runware';

const ImageGenerator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState('realistic');
  const [size, setSize] = useState('1024x1024');
  const [apiKey, setApiKey] = useState('');
  const [runwareService, setRunwareService] = useState<RunwareService | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [generatedImageData, setGeneratedImageData] = useState<any>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('runware-api-key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
      setRunwareService(new RunwareService(savedApiKey));
    }
  }, []);

  const styles = [
    { value: 'realistic', label: 'Realistic', model: 'runware:100@1' },
    { value: 'artistic', label: 'Artistic', model: 'runware:100@1' },
    { value: 'cartoon', label: 'Cartoon', model: 'runware:100@1' },
    { value: 'anime', label: 'Anime', model: 'runware:100@1' },
    { value: 'oil-painting', label: 'Oil Painting', model: 'runware:100@1' },
    { value: 'watercolor', label: 'Watercolor', model: 'runware:100@1' },
    { value: 'digital-art', label: 'Digital Art', model: 'runware:100@1' },
    { value: 'fantasy', label: 'Fantasy', model: 'runware:100@1' },
  ];

  const sizes = [
    { value: '512x512', label: '512×512 (Small)', width: 512, height: 512 },
    { value: '1024x1024', label: '1024×1024 (Medium)', width: 1024, height: 1024 },
    { value: '1024x768', label: '1024×768 (Landscape)', width: 1024, height: 768 },
    { value: '768x1024', label: '768×1024 (Portrait)', width: 768, height: 1024 },
    { value: '1920x1080', label: '1920×1080 (HD)', width: 1920, height: 1080 },
  ];

  const handleApiKeySubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Runware API key.",
        variant: "destructive",
      });
      return;
    }

    try {
      localStorage.setItem('runware-api-key', apiKey);
      setRunwareService(new RunwareService(apiKey));
      setShowApiKeyInput(false);
      toast({
        title: "Success!",
        description: "API key configured successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize Runware service.",
        variant: "destructive",
      });
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }

    if (!runwareService) {
      toast({
        title: "Error",
        description: "Please configure your Runware API key first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const selectedStyle = styles.find(s => s.value === style);
      const selectedSize = sizes.find(s => s.value === size);
      
      // Create style-enhanced prompt
      const stylePrompt = `${prompt}, ${style} style, high quality, detailed`;
      
      const params: GenerateImageParams = {
        positivePrompt: stylePrompt,
        model: selectedStyle?.model || 'runware:100@1',
        width: selectedSize?.width || 1024,
        height: selectedSize?.height || 1024,
        numberResults: 1,
        outputFormat: 'WEBP',
        CFGScale: 7,
        scheduler: 'FlowMatchEulerDiscreteScheduler',
        strength: 0.8,
      };

      const result = await runwareService.generateImage(params);
      setGeneratedImage(result.imageURL);
      setGeneratedImageData(result);
      
      toast({
        title: "Success!",
        description: `Image generated successfully! Cost: $${result.cost.toFixed(4)}`,
      });
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: "Image downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Ad Placeholder - Adsterra Banner */}
      <div className="container mx-auto mb-8">
        <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Advertisement Space (Adsterra Banner)</p>
          <p className="text-xs text-muted-foreground">728x90 Banner Ad</p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* API Key Configuration */}
        {showApiKeyInput && (
          <Alert className="mb-8">
            <Key className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Configure Runware API Key</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    To use real AI image generation, you need a Runware API key. 
                    Get yours at <a href="https://runware.ai/" target="_blank" rel="noopener noreferrer" className="text-primary underline">runware.ai</a>
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter your Runware API key..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApiKeySubmit}>
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Image className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI Image Generator {runwareService && '(Connected)'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Image Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning images from text descriptions using advanced AI technology. Turn your imagination into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Image Settings
              </CardTitle>
              <CardDescription>
                Describe your image and customize the generation settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Image Prompt</label>
                <Input
                  placeholder="Describe the image you want to create... (e.g., 'A sunset over a calm ocean with flying seagulls')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Size</label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Pro Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Be specific about colors, lighting, and composition</li>
                  <li>• Mention art style (e.g., "in the style of Van Gogh")</li>
                  <li>• Add mood descriptors (e.g., "dreamy", "dramatic")</li>
                  <li>• Include camera settings for realistic photos</li>
                </ul>
              </div>

              <Button 
                onClick={generateImage}
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="w-4 h-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Generated Image
                    {generatedImage && <Badge variant="secondary">Ready</Badge>}
                  </CardTitle>
                  <CardDescription>
                    Your AI-generated image will appear here.
                  </CardDescription>
                </div>
                {generatedImage && (
                  <Button variant="outline" size="sm" onClick={downloadImage}>
                    <Download className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="relative group">
                  <img
                    src={generatedImage}
                    alt="Generated artwork"
                    className="w-full rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button variant="secondary" onClick={downloadImage}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 border border-dashed border-muted-foreground/25 rounded-lg aspect-square flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">
                      Generated image will appear here
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sample Images Gallery */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Sample Generated Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group overflow-hidden rounded-lg aspect-square">
                <img
                  src={`https://picsum.photos/300/300?random=${i}`}
                  alt={`Sample ${i}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-2 left-2 text-white text-xs">
                    Sample {i}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CPA Offer Placeholder */}
        <div className="mt-12 p-6 bg-gradient-primary/10 border border-primary/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">🎨 Unlock HD Image Generation</h3>
          <p className="text-muted-foreground mb-4">
            Get access to 4K image generation, unlimited downloads, and premium styles
          </p>
          <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">CPA Offer Placement (CPA Grip Integration)</p>
            <p className="text-xs text-muted-foreground">Complete offer to unlock HD generation</p>
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

export default ImageGenerator;