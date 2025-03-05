import { Instagram, Facebook, MessageCircle, Send } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    { icon: <Instagram size={16} />, url: 'https://www.instagram.com/mt_tours', label: 'Instagram' },
    { icon: <Facebook size={16} />, url: 'https://www.facebook.com/profile.php?id=100092212643433', label: 'Facebook' },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8c0-3.5 3.2-6.4 7.2-6.4 3.9 0 7.1 2.9 7.1 6.4 0 2.8-2.3 5.2-5.7 6.2l-.4 3.8H8.3l-.4-3.8C4.5 13.2 3 10.8 3 8z"/>
          <path d="M8 19h8"/>
        </svg>
      ), 
      url: 'https://vk.com/mt_travel_agency', 
      label: 'VKontakte' 
    },
    { 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M8 12.5l4 4 4-4"/>
          <path d="M12 7.5v9"/>
        </svg>
      ), 
      url: 'https://ok.ru/profile/910045750041', 
      label: 'Odnoklassniki' 
    },
    { icon: <MessageCircle size={16} />, url: 'https://wa.me/+79339191515', label: 'WhatsApp' },
    { icon: <Send size={16} />, url: 'https://t.me/mt_tours', label: 'Telegram' }
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className="text-white hover:text-primary-200 transition-colors"
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
