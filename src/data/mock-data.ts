import type { Student, TimetableEntry, PendingWork, Reminder, ClassOverview, FeedbackData } from "@/lib/types";

export const students: Student[] = [
  { id: '1', name: 'Liam Johnson', grade: 85, engagement: 'High', lastActivity: 'Submitted "Algebra II" homework', avatar: '/avatars/01.png' },
  { id: '2', name: 'Olivia Smith', grade: 92, engagement: 'High', lastActivity: 'Answered a poll in "World History"', avatar: '/avatars/02.png' },
  { id: '3', name: 'Noah Williams', grade: 78, engagement: 'Medium', lastActivity: 'Viewed "Chemistry" lecture', avatar: '/avatars/03.png' },
  { id: '4', name: 'Emma Brown', grade: 65, engagement: 'Low', lastActivity: 'Missed "English Literature" deadline', avatar: '/avatars/04.png' },
  { id: '5', name: 'Oliver Jones', grade: 88, engagement: 'High', lastActivity: 'Commented on a "Physics" discussion', avatar: '/avatars/05.png' },
  { id: '6', name: 'Ava Garcia', grade: 75, engagement: 'Medium', lastActivity: 'Submitted "Art History" project', avatar: '/avatars/01.png' },
  { id: '7', name: 'Elijah Miller', grade: 95, engagement: 'High', lastActivity: 'Aced the "Calculus" quiz', avatar: '/avatars/02.png' },
  { id: '8', name: 'Charlotte Davis', grade: 81, engagement: 'Medium', lastActivity: 'Viewed "Biology" resources', avatar: '/avatars/03.png' },
  { id: '9', name: 'James Rodriguez', grade: 72, engagement: 'Low', lastActivity: 'Has not logged in for 3 days', avatar: '/avatars/04.png' },
  { id: '10', name: 'Sophia Wilson', grade: 89, engagement: 'High', lastActivity: 'Completed "Computer Science" module', avatar: '/avatars/05.png' },
];

export const timetable: TimetableEntry[] = [
  { time: "09:00 - 10:00", monday: "Mathematics", tuesday: "Free", wednesday: "Mathematics", thursday: "English", friday: "Mathematics" },
  { time: "10:00 - 11:00", monday: "English", tuesday: "Science", wednesday: "English", thursday: "Science", friday: "Free" },
  { time: "11:00 - 12:00", monday: "Science", tuesday: "Mathematics", wednesday: "History", thursday: "Free", friday: "Science" },
  { time: "12:00 - 01:00", monday: "Lunch", tuesday: "Lunch", wednesday: "Lunch", thursday: "Lunch", friday: "Lunch" },
  { time: "01:00 - 02:00", monday: "History", tuesday: "Art", wednesday: "Free", thursday: "History", friday: "Physical Ed." },
  { time: "02:00 - 03:00", monday: "Free", tuesday: "History", wednesday: "Science", thursday: "Mathematics", friday: "English" },
];

export const pendingWork: PendingWork[] = [
    { id: '1', title: 'Grade "Algebra II" Homework', dueDate: 'Tomorrow', subject: 'Mathematics' },
    { id: '2', title: 'Review "World War II" Essays', dueDate: 'In 3 days', subject: 'History' },
    { id: '3', title: 'Prepare "Cell Division" Lab', dueDate: 'In 5 days', subject: 'Science' },
];

export const reminders: Reminder[] = [
    { id: '1', title: 'Parent-Teacher Meeting', time: 'Today, 4:00 PM' },
    { id: '2', title: 'Faculty Department Meeting', time: 'Tomorrow, 8:30 AM' },
    { id: '3', title: 'Submit Mid-term Grades', time: 'Friday, 5:00 PM' },
];

export const classOverviewData: ClassOverview[] = [
    { id: '1', name: 'Class 5A', students: 28, pending: 5, completed: 12 },
    { id: '2', name: 'Class 6B', students: 32, pending: 3, completed: 15 },
    { id: '3', name: 'Class 7C', students: 25, pending: 7, completed: 7 },
];

export const feedbackData: FeedbackData[] = [
  { rating: 'Excellent', count: 45 },
  { rating: 'Good', count: 72 },
  { rating: 'Medium', count: 15 },
  { rating: 'Bad', count: 5 },
];
