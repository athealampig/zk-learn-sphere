import { NavLink, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Shield, 
  Settings,
  BarChart3
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: "Users",
      href: "/admin/users",
      icon: Users
    },
    {
      label: "Quizzes",
      href: "/admin/quizzes",
      icon: BookOpen
    },
    {
      label: "Proofs",
      href: "/admin/proofs",
      icon: Shield
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings
    }
  ];

  return (
    <Card className="glass border-white/20 w-64 h-fit">
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">Admin Panel</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            System Administration
          </Badge>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
};

export default AdminSidebar;