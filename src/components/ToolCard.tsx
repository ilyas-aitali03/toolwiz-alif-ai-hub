import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  badge?: 'free' | 'new' | 'popular';
  comingSoon?: boolean;
}

export const ToolCard = ({ title, description, icon: Icon, href, badge, comingSoon }: ToolCardProps) => {
  const { t } = useLanguage();

  const getBadgeText = (badgeType: string) => {
    switch (badgeType) {
      case 'free': return t('common.free');
      case 'new': return t('common.new');
      case 'popular': return t('common.popular');
      default: return badgeType;
    }
  };

  const getBadgeVariant = (badgeType: string) => {
    switch (badgeType) {
      case 'free': return 'secondary';
      case 'new': return 'default';
      case 'popular': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-card border border-border/50 p-6 transition-all duration-300 hover:shadow-card hover:scale-102">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <Badge variant={getBadgeVariant(badge) as any} className="text-xs">
            {getBadgeText(badge)}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      {comingSoon ? (
        <Button variant="outline" disabled className="w-full">
          {t('common.comingSoon')}
        </Button>
      ) : (
        <Button asChild variant="tool" className="w-full">
          <Link to={href}>
            {t('common.tryNow')}
          </Link>
        </Button>
      )}
    </div>
  );
};