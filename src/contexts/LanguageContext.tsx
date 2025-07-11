import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Homepage
    'home.title': 'ToolWiz.AI',
    'home.subtitle': 'Free AI-Powered Tools for Everyone',
    'home.description': 'Access powerful AI tools completely free. Generate text, create images, convert PDFs, build resumes, and much more.',
    'home.getStarted': 'Get Started',
    'home.exploreTools': 'Explore Tools',
    'home.featuredTools': 'Featured AI Tools',
    
    // Tools
    'tools.aiTextGenerator': 'AI Text Generator',
    'tools.aiTextGenerator.desc': 'Generate high-quality text content using advanced AI',
    'tools.aiImageGenerator': 'AI Image Generator',
    'tools.aiImageGenerator.desc': 'Create stunning images from text descriptions',
    'tools.pdfConverter': 'PDF Converter',
    'tools.pdfConverter.desc': 'Convert, compress, split, and merge PDF files',
    'tools.resumeBuilder': 'Resume Builder',
    'tools.resumeBuilder.desc': 'Create professional resumes with AI assistance',
    'tools.youtubeDownloader': 'YouTube Downloader',
    'tools.youtubeDownloader.desc': 'Download YouTube videos and audio files',
    'tools.chatBot': 'AI Chat Bot',
    'tools.chatBot.desc': 'Chat with our intelligent AI assistant',
    'tools.codeGenerator': 'Code Generator',
    'tools.codeGenerator.desc': 'Generate code in multiple programming languages',
    'tools.translator': 'Language Translator',
    'tools.translator.desc': 'Translate text between 100+ languages',
    
    // Common
    'common.free': 'Free',
    'common.new': 'New',
    'common.popular': 'Popular',
    'common.tryNow': 'Try Now',
    'common.comingSoon': 'Coming Soon',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
    'common.language': 'Language',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.tools': 'الأدوات',
    'nav.about': 'حول',
    'nav.contact': 'اتصل بنا',
    
    // Homepage
    'home.title': 'ToolWiz.AI',
    'home.subtitle': 'أدوات ذكاء اصطناعي مجانية للجميع',
    'home.description': 'احصل على أدوات الذكاء الاصطناعي القوية مجاناً. أنشئ النصوص، اصنع الصور، حول ملفات PDF، أنشئ السير الذاتية، والمزيد.',
    'home.getStarted': 'ابدأ الآن',
    'home.exploreTools': 'استكشف الأدوات',
    'home.featuredTools': 'أدوات الذكاء الاصطناعي المميزة',
    
    // Tools
    'tools.aiTextGenerator': 'مولد النصوص الذكي',
    'tools.aiTextGenerator.desc': 'أنشئ محتوى نصي عالي الجودة باستخدام الذكاء الاصطناعي',
    'tools.aiImageGenerator': 'مولد الصور الذكي',
    'tools.aiImageGenerator.desc': 'أنشئ صوراً مذهلة من الوصف النصي',
    'tools.pdfConverter': 'محول PDF',
    'tools.pdfConverter.desc': 'حول، اضغط، قسم، ادمج ملفات PDF',
    'tools.resumeBuilder': 'منشئ السيرة الذاتية',
    'tools.resumeBuilder.desc': 'أنشئ سيرة ذاتية احترافية بمساعدة الذكاء الاصطناعي',
    'tools.youtubeDownloader': 'محمل يوتيوب',
    'tools.youtubeDownloader.desc': 'حمل فيديوهات وملفات صوتية من يوتيوب',
    'tools.chatBot': 'مساعد ذكي للدردشة',
    'tools.chatBot.desc': 'تحدث مع مساعدنا الذكي',
    'tools.codeGenerator': 'مولد الأكواد',
    'tools.codeGenerator.desc': 'أنشئ أكواد بلغات برمجة متعددة',
    'tools.translator': 'مترجم اللغات',
    'tools.translator.desc': 'ترجم النصوص بين أكثر من 100 لغة',
    
    // Common
    'common.free': 'مجاني',
    'common.new': 'جديد',
    'common.popular': 'شائع',
    'common.tryNow': 'جرب الآن',
    'common.comingSoon': 'قريباً',
    'common.darkMode': 'الوضع المظلم',
    'common.lightMode': 'الوضع المضيء',
    'common.language': 'اللغة',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('toolwiz-language') as 'en' | 'ar' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toolwiz-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};