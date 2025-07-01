import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-student-feedback.ts';
import '@/ai/flows/generate-lesson-plan.ts';
import '@/ai/flows/answer-teacher-query.ts';
import '@/ai/flows/generate-assessment-questions.ts';
import '@/ai/flows/design-visual-aids.ts';
import '@/ai/flows/generate-hyperlocal-content.ts';
import '@/ai/flows/generate-timetable.ts';
import '@/ai/flows/generate-image.ts';
import '@/ai/flows/generate-lesson-from-material.ts';
import '@/ai/flows/answer-student-query.ts';
import '@/ai/flows/generate-student-lesson.ts';
