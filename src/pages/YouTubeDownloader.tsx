import { useState } from 'react';
import { Download, Play, Music, Video, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
  formats: Array<{
    quality: string;
    format: string;
    size: string;
  }>;
}

const YouTubeDownloader = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('mp4-720p');

  const validateYouTubeUrl = (url: string): boolean => {
    const patterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /^https?:\/\/(www\.)?youtu\.be\/[\w-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]+/,
    ];
    return patterns.some(pattern => pattern.test(url));
  };

  const fetchVideoInfo = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    if (!validateYouTubeUrl(url)) {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate fetching video info
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Use yt-dlp or youtube-dl on your server
      // 2. Parse video metadata and available formats
      // 3. Return the information to the frontend
      
      const mockVideoInfo: VideoInfo = {
        title: "Sample YouTube Video Title - ToolWiz.AI Demo",
        duration: "3:45",
        thumbnail: "https://picsum.photos/320/180?random=1",
        formats: [
          { quality: "1080p", format: "MP4", size: "45.2 MB" },
          { quality: "720p", format: "MP4", size: "28.7 MB" },
          { quality: "480p", format: "MP4", size: "18.3 MB" },
          { quality: "360p", format: "MP4", size: "12.1 MB" },
          { quality: "Audio Only", format: "MP3", size: "3.2 MB" },
        ],
      };
      
      setVideoInfo(mockVideoInfo);
      toast({
        title: "Success!",
        description: "Video information loaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch video information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!videoInfo) return;

    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, you would:
      // 1. Send download request to your server
      // 2. Server downloads the video using yt-dlp
      // 3. Return download link or stream the file
      
      toast({
        title: "Download Started!",
        description: "Your download will begin shortly.",
      });
      
      // Simulate file download
      const blob = new Blob(['Mock video content'], { type: 'video/mp4' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${videoInfo.title.replace(/[^a-zA-Z0-9]/g, '_')}.${selectedFormat.includes('mp3') ? 'mp3' : 'mp4'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
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

      <div className="container mx-auto max-w-4xl">
        {/* Legal Notice */}
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p className="font-medium mb-1">Important Legal Notice</p>
            <p className="text-sm">
              This tool is for educational and personal use only. Please respect copyright laws and YouTube's Terms of Service. 
              Only download content you own or have permission to download.
            </p>
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Download className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">YouTube Downloader</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            YouTube Video Downloader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download YouTube videos and audio in multiple formats and qualities. Fast, free, and easy to use.
          </p>
        </div>

        {/* URL Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Enter YouTube URL
            </CardTitle>
            <CardDescription>
              Paste the YouTube video URL you want to download.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={fetchVideoInfo}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  'Get Info'
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Supported formats: youtube.com/watch, youtu.be, youtube.com/embed
            </p>
          </CardContent>
        </Card>

        {/* Video Information */}
        {videoInfo && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={videoInfo.thumbnail}
                  alt="Video thumbnail"
                  className="w-full md:w-80 h-48 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{videoInfo.title}</h3>
                    <p className="text-muted-foreground">Duration: {videoInfo.duration}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Select Format & Quality</label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {videoInfo.formats.map((format, index) => (
                          <SelectItem key={index} value={`${format.format.toLowerCase()}-${format.quality.toLowerCase()}`}>
                            {format.quality} - {format.format} ({format.size})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={downloadVideo}
                    disabled={isDownloading}
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Video className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Download in MP4, MP3, and other popular formats
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Music className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Audio Extraction</h3>
              <p className="text-sm text-muted-foreground">
                Extract audio as MP3 for music and podcasts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6 text-center">
              <Download className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">
                Download in up to 1080p HD quality
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CPA Offer Placeholder */}
        <div className="mt-12 p-6 bg-gradient-primary/10 border border-primary/20 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">🚀 Unlock Unlimited Downloads</h3>
          <p className="text-muted-foreground mb-4">
            Remove download limits, access playlist downloads, and get premium speeds
          </p>
          <div className="bg-muted/50 border border-dashed border-muted-foreground/25 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">CPA Offer Placement (CPA Grip Integration)</p>
            <p className="text-xs text-muted-foreground">Complete offer to unlock unlimited downloads</p>
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

export default YouTubeDownloader;