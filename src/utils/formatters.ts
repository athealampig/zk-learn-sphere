// Currency formatters
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// XP and score formatters
export const formatXP = (xp: number): string => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M XP`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K XP`;
  }
  return `${xp} XP`;
};

export const formatScore = (score: number, total: number = 100): string => {
  const percentage = Math.round((score / total) * 100);
  return `${score}/${total} (${percentage}%)`;
};

// Duration formatters
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
};

export const formatTimeRemaining = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Progress formatters
export const formatProgress = (current: number, total: number): string => {
  if (total === 0) return '0%';
  const percentage = Math.round((current / total) * 100);
  return `${percentage}%`;
};

export const formatCompletionRate = (completed: number, total: number): string => {
  if (total === 0) return 'No data';
  return `${completed}/${total} completed`;
};

// Status formatters
export const formatProofStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'pending': return 'Pending Review';
    case 'generating': return 'Generating Proof';
    case 'verified': return 'Verified ✓';
    case 'failed': return 'Generation Failed';
    default: return status;
  }
};

export const formatUserStatus = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active': return 'Active';
    case 'inactive': return 'Inactive';
    case 'suspended': return 'Suspended';
    default: return status;
  }
};

// Address formatters
export const formatAddress = (address: {
  line1: string;
  line2?: string;
  city: string;
  country: string;
  postalCode: string;
}): string => {
  const parts = [
    address.line1,
    address.line2,
    address.city,
    address.postalCode,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
};

export const formatShortAddress = (address: string, maxLength: number = 30): string => {
  if (address.length <= maxLength) return address;
  return address.substring(0, maxLength - 3) + '...';
};

// Hash formatters
export const formatHash = (hash: string, length: number = 8): string => {
  if (!hash) return '';
  if (hash.length <= length * 2) return hash;
  return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
};

export const formatTransactionHash = (hash: string): string => {
  return formatHash(hash, 6);
};

// File size formatters (more specific than in helpers)
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Achievement formatters
export const formatAchievement = (achievement: {
  name: string;
  description: string;
  unlockedAt?: string;
}): string => {
  const unlocked = achievement.unlockedAt ? 'Unlocked' : 'Locked';
  return `${achievement.name} - ${unlocked}`;
};

// Level formatters
export const formatLevel = (level: number, xp: number, nextLevelXp: number): string => {
  const progress = Math.round((xp / nextLevelXp) * 100);
  return `Level ${level} (${progress}%)`;
};

// Quiz attempt formatters
export const formatQuizAttempt = (attempt: {
  score: number;
  totalQuestions: number;
  duration: number;
  completedAt: string;
}): string => {
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
  const duration = formatDuration(attempt.duration);
  return `${percentage}% in ${duration}`;
};

// Billing formatters
export const formatBillingPeriod = (period: 'monthly' | 'yearly'): string => {
  return period === 'monthly' ? 'per month' : 'per year';
};

export const formatNextBilling = (date: string): string => {
  const nextDate = new Date(date);
  const now = new Date();
  const diffTime = nextDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays < 7) return `In ${diffDays} days`;
  if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
  
  return nextDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Analytics formatters
export const formatAnalyticsValue = (value: number, type: 'count' | 'percentage' | 'currency'): string => {
  switch (type) {
    case 'count':
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toString();
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return formatCurrency(value);
    default:
      return value.toString();
  }
};