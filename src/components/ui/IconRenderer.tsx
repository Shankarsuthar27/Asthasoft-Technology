import React from 'react';
import {
  Code2,
  Server,
  Palette,
  Briefcase,
  Smartphone,
  Layers,
  Sparkles,
  Bot,
  BrainCircuit,
  Cpu,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Building2,
  Stethoscope,
  Landmark,
  Truck,
  Award,
  Users,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  RefreshCw,
  X,
  Menu,
  ChevronDown,
  ChevronRight,
  Shield,
  FileCheck,
  Headphones,
  Lock,
  Search,
} from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  const props = { className, size };

  switch (name.toLowerCase()) {
    case 'code-2':
    case 'code':
      return <Code2 {...props} />;
    case 'server':
    case 'cloud':
      return <Server {...props} />;
    case 'palette':
    case 'design':
      return <Palette {...props} />;
    case 'briefcase':
      return <Briefcase {...props} />;
    case 'smartphone':
    case 'mobile':
      return <Smartphone {...props} />;
    case 'layers':
      return <Layers {...props} />;
    case 'sparkles':
      return <Sparkles {...props} />;
    case 'bot':
    case 'ai':
      return <Bot {...props} />;
    case 'brain':
    case 'brain-circuit':
      return <BrainCircuit {...props} />;
    case 'cpu':
      return <Cpu {...props} />;
    case 'shield':
    case 'shield-check':
      return <ShieldCheck {...props} />;
    case 'zap':
      return <Zap {...props} />;
    case 'globe':
      return <Globe {...props} />;
    case 'database':
      return <Database {...props} />;
    case 'building':
    case 'building2':
      return <Building2 {...props} />;
    case 'stethoscope':
    case 'health':
      return <Stethoscope {...props} />;
    case 'landmark':
    case 'bank':
      return <Landmark {...props} />;
    case 'truck':
    case 'logistics':
      return <Truck {...props} />;
    case 'award':
      return <Award {...props} />;
    case 'users':
      return <Users {...props} />;
    case 'phone-call':
      return <PhoneCall {...props} />;
    case 'clock':
      return <Clock {...props} />;
    case 'headphones':
      return <Headphones {...props} />;
    case 'lock':
      return <Lock {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};
