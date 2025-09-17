import { Link } from "react-router-dom";
import { Zap, Github, Twitter, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "About", href: "/about" },
      { name: "How it Works", href: "/about#how-it-works" },
      { name: "Pricing", href: "/subscription" },
      { name: "Documentation", href: "/docs" },
    ],
    features: [
      { name: "Interactive Quizzes", href: "/quizzes" },
      { name: "Achievements", href: "/achievements" },
      { name: "Zero-Knowledge Proofs", href: "/proofs" },
      { name: "Progress Tracking", href: "/progress" },
    ],
    community: [
      { name: "Discord", href: "https://discord.gg/connectsphere", external: true },
      { name: "Twitter", href: "https://twitter.com/connectsphere", external: true },
      { name: "GitHub", href: "https://github.com/connectsphere", external: true },
      { name: "Support", href: "/support" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/connectsphere", icon: Github },
    { name: "Twitter", href: "https://twitter.com/connectsphere", icon: Twitter },
    { name: "Discord", href: "https://discord.gg/connectsphere", icon: MessageCircle },
    { name: "Email", href: "mailto:hello@connectsphere.io", icon: Mail },
  ];

  return (
    <footer className="border-t border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 hover-lift">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-secondary glow-primary">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ConnectSphere</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Master Web3 technologies through interactive learning with zero-knowledge proofs 
              and blockchain integration.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover-lift"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ConnectSphere. All rights reserved.
          </p>
          <p className="mt-2 sm:mt-0 text-sm text-muted-foreground">
            Built with 💙 for the Web3 community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;