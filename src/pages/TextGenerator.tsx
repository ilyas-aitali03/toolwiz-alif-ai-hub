import { useState } from 'react';
import { Bot, Copy, Download, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const TextGenerator = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [textType, setTextType] = useState('article');

  const textTypes = [
    { value: 'article', label: 'Article' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'email', label: 'Email' },
    { value: 'essay', label: 'Essay' },
    { value: 'story', label: 'Story' },
    { value: 'summary', label: 'Summary' },
    { value: 'product-description', label: 'Product Description' },
    { value: 'social-media', label: 'Social Media Post' },
  ];

  const generateText = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate text.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate AI text generation - In production, you'd use HuggingFace Transformers
      // or another AI service like OpenAI, Anthropic, etc.
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sampleGeneratedText = `Here's a professionally generated ${textType} based on your prompt: "${prompt}"

This is a demonstration of the AI text generation capability. In a production environment, this would connect to advanced language models like GPT-4, Claude, or open-source alternatives through APIs such as:

• HuggingFace Transformers
• OpenAI API
• Anthropic Claude
• Cohere API
• Together AI

The generated content would be contextually relevant, well-structured, and tailored to the specific text type you selected (${textType}).

Key benefits of using our AI text generator:
- Save hours of writing time
- Generate multiple variations
- Maintain consistent tone and style
- Support for multiple languages
- SEO-optimized content

This tool can help you create compelling content for blogs, articles, emails, product descriptions, social media posts, and much more.`;

      setGeneratedText(sampleGeneratedText);
      toast({
        title: "Success!",
        description: "Text generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedText) return;
    
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text.",
        variant: "destructive",
      });
    }
  };

  const downloadText = () => {
    if (!generatedText) return;

    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-${textType}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully.",
    });
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

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Bot className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">AI Text Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            AI Text Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate high-quality content for any purpose with advanced AI technology. Create articles, blog posts, emails, and more in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Content Settings
              </CardTitle>
              <CardDescription>
                Describe what you want to generate and select the content type.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Content Type</label>
                <Select value={textType} onValueChange={setTextType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {textTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Prompt</label>
                <Textarea
                  placeholder="Describe what you want to generate... (e.g., 'Write a blog post about the benefits of renewable energy')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={generateText}
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
                    <Bot className="w-4 h-4 mr-2" />
                    Generate Text
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
                    Generated Content
                    {generatedText && <Badge variant="secondary">Ready</Badge>}
                  </CardTitle>
                  <CardDescription>
                    Your AI-generated content will appear here.
                  </CardDescription>
                </div>
                {generatedText && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadText}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedText ? (
                <div className="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {generatedText}
                  </pre>
                </div>
              ) : (
                <div className="bg-muted/30 border border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Generated content will appear here after you click "Generate Text"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CPA Offer Placeholder */}
        <div className="mt-12 p-6 bg-gradient-primary/10 border border-primary/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">💎 Unlock Premium Features</h3>
          <p className="text-muted-foreground mb-4">
            Get access to advanced AI models, longer content generation, and priority processing
          </p>
          <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">CPA Offer Placement (CPA Grip Integration)</p>
            <p className="text-xs text-muted-foreground">Complete survey/offer to unlock premium features</p>
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

export default TextGenerator;