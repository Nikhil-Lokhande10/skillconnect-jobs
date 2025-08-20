import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, User, Briefcase, Clock } from "lucide-react";
import { getCurrentUser, User as AuthUser } from "@/utils/auth";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  type: 'job_posted' | 'worker_interested' | 'job_completed' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter = ({ isOpen, onClose }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      // Minimal live notifications: new open jobs, or applications on your jobs
      const fetchNotifications = async () => {
        if (currentUser.userType === 'worker') {
          const { data } = await supabase
            .from('jobs')
            .select('id,title,created_at')
            .eq('status', 'open')
            .order('created_at', { ascending: false })
            .limit(5);
          const notifs: Notification[] = (data || []).map((j: { id: string; title: string; created_at: string }) => ({
            id: j.id,
            type: 'job_posted',
            title: 'New Job Posted',
            message: j.title,
            timestamp: new Date(j.created_at).toLocaleString(),
            read: false,
            actionUrl: '/manage-services'
          }));
          setNotifications(notifs);
        } else {
          const { data } = await supabase
            .from('applications')
            .select('id, created_at, jobs:job_id(title)')
            .order('created_at', { ascending: false })
            .limit(5);
          const notifs: Notification[] = (data as Array<{ id: string; created_at: string; jobs?: { title?: string } }> | null || []).map((a) => ({
            id: a.id,
            type: 'worker_interested',
            title: 'New Application',
            message: a.jobs?.title ?? 'Your job received a new application',
            timestamp: new Date(a.created_at).toLocaleString(),
            read: false
          }));
          setNotifications(notifs);
        }
      };
      fetchNotifications();
    }
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "All notifications marked as read",
    });
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'job_posted':
        return <Briefcase className="h-4 w-4 text-blue-500" />;
      case 'worker_interested':
        return <User className="h-4 w-4 text-green-500" />;
      case 'job_completed':
        return <Clock className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-yellow-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 z-50">
      <Card className="border shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors ${
                    !notification.read ? 'bg-accent/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-6 w-6 p-0"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;