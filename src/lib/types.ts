export interface Student {
  id: string;
  name: string;
  grade: number;
  engagement: "High" | "Medium" | "Low";
  lastActivity: string;
  avatar: string;
}

export interface TimetableEntry {
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

export interface PendingWork {
  id: string;
  title: string;
  dueDate: string;
  subject: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
}

export interface ClassOverview {
    id: string;
    name: string;
    students: number;
    pending: number;
    completed: number;
}

export interface FeedbackData {
  rating: string;
  count: number;
}
