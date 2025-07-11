import { 
  Bot, 
  Image, 
  FileText, 
  User, 
  Download, 
  MessageSquare, 
  Code, 
  Languages,
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolCard } from '@/components/ToolCard';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const tools = [
    {
      title: t('tools.aiTextGenerator'),
      description: t('tools.aiTextGenerator.desc'),
      icon: Bot,
      href: '/tools/text-generator',
      badge: 'popular' as const,
    },
    {
      title: t('tools.aiImageGenerator'),
      description: t('tools.aiImageGenerator.desc'),
      icon: Image,
      href: '/tools/image-generator',
      badge: 'new' as const,
    },
    {
      title: t('tools.pdfConverter'),
      description: t('tools.pdfConverter.desc'),
      icon: FileText,
      href: '/tools/pdf-converter',
      badge: 'free' as const,
    },
    {
      title: t('tools.resumeBuilder'),
      description: t('tools.resumeBuilder.desc'),
      icon: User,
      href: '/tools/resume-builder',
      badge: 'popular' as const,
    },
    {
      title: t('tools.youtubeDownloader'),
      description: t('tools.youtubeDownloader.desc'),
      icon: Download,
      href: '/tools/youtube-downloader',
      badge: 'free' as const,
    },
    {
      title: t('tools.chatBot'),
      description: t('tools.chatBot.desc'),
      icon: MessageSquare,
      href: '/tools/chat-bot',
      badge: 'new' as const,
    },
    {
      title: t('tools.codeGenerator'),
      description: t('tools.codeGenerator.desc'),
      icon: Code,
      href: '/tools/code-generator',
      comingSoon: true,
    },
    {
      title: t('tools.translator'),
      description: t('tools.translator.desc'),
      icon: Languages,
      href: '/tools/translator',
      badge: 'free' as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6 inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">{t('common.free')} AI Tools</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            {t('home.title')}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" variant="hero" className="group">
              {t('home.getStarted')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="xl" variant="outline">
              {t('home.exploreTools')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8+</div>
              <div className="text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">{t('common.free')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Star className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">{t('home.featuredTools')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {t('home.featuredTools')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of powerful AI tools designed to boost your productivity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <ToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
                badge={tool.badge}
                comingSoon={tool.comingSoon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-primary p-12 text-center">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to boost your productivity?
              </h3>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already using our AI tools to create amazing content.
              </p>
              <Button size="xl" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                {t('home.getStarted')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
