// App-wide constants
export const APP_NAME = 'AptiQuant';
export const APP_TAGLINE = 'Elite Placement Training System';

// Timing
export const SPRINT_DURATION_SECONDS = 15 * 60; // 15 minutes
export const BREAK_DURATION_SECONDS = 3 * 60;   // 3 minutes
export const CHEATSHEET_MAX_MINUTES = 5;

// Structure
export const TOTAL_DAYS = 30;
export const SPRINTS_PER_DAY = 5;
export const QUESTIONS_PER_SPRINT = 10;
export const QUESTIONS_PER_DAY = SPRINTS_PER_DAY * QUESTIONS_PER_SPRINT; // 50

// Gamification
export const XP_CORRECT_EASY = 10;
export const XP_CORRECT_MEDIUM = 20;
export const XP_CORRECT_HARD = 35;
export const XP_PERFECT_SPRINT = 50;
export const XP_PERFECT_DAY = 200;
export const XP_STREAK_BONUS = 15;
export const XP_SPEED_BONUS = 5; // for answering under expected time
export const XP_PER_LEVEL = 500;

// Timer thresholds (seconds remaining)
export const TIMER_WARNING_THRESHOLD = 5 * 60;  // 5 minutes
export const TIMER_DANGER_THRESHOLD = 2 * 60;   // 2 minutes
export const TIMER_CRITICAL_THRESHOLD = 30;      // 30 seconds

// Slow answer threshold (multiples of expected time)
export const SLOW_ANSWER_MULTIPLIER = 2.0;

// Colors
export const COLORS = {
  background: '#09090B',
  card: '#18181B',
  cardHover: '#27272A',
  accent: '#6366F1',
  accentLight: '#818CF8',
  accentDark: '#4F46E5',
  correct: '#22C55E',
  correctBg: '#22C55E15',
  wrong: '#EF4444',
  wrongBg: '#EF444415',
  warning: '#F59E0B',
  warningBg: '#F59E0B15',
  muted: '#71717A',
  mutedLight: '#A1A1AA',
  text: '#FAFAFA',
  textSecondary: '#A1A1AA',
  border: '#27272A',
  borderLight: '#3F3F46',
} as const;

// Company list
export const COMPANIES = [
  'Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'JP Morgan',
  'Oracle', 'Adobe', 'Flipkart', 'Nvidia', 'Intel',
  'Qualcomm', 'Walmart', 'Uber', 'Atlassian',
  'Service Companies', 'Product Companies', 'Startups',
] as const;

export type CompanyTag = typeof COMPANIES[number];

// Topics
export const QUANT_TOPICS = [
  'Percentages', 'Profit & Loss', 'SI & CI', 'Ratio & Proportion',
  'Mixtures & Alligation', 'Averages', 'Time & Work', 'Pipes & Cisterns',
  'Speed Distance Time', 'Boats & Streams', 'Geometry', 'Mensuration',
  'Algebra', 'Number Systems', 'Divisibility', 'LCM & HCF',
  'Permutations & Combinations', 'Probability', 'Progressions',
  'Logarithms', 'Modern Math',
] as const;

export const REASONING_TOPICS = [
  'Blood Relations', 'Seating Arrangement', 'Puzzles', 'Coding Decoding',
  'Syllogism', 'Statement & Assumption', 'Statement & Conclusion',
  'Data Sufficiency', 'Direction Sense', 'Clocks', 'Calendars',
  'Cubes & Dice', 'Ranking & Order', 'Data Interpretation',
] as const;

export const CS_LOGIC_TOPICS = [
  'Graph Traversal', 'Complexity Analysis', 'Binary Search Logic',
  'Prefix Sum & Sliding Window', 'Tree Logic', 'Dynamic Arrays',
  'ML Matrix Shapes', 'SQL Reasoning', 'Database Normalization',
  'Hash Maps', 'Memory Optimization',
] as const;

export const ALL_TOPICS = [
  ...QUANT_TOPICS,
  ...REASONING_TOPICS,
  ...CS_LOGIC_TOPICS,
] as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  option1: '1',
  option2: '2',
  option3: '3',
  option4: '4',
  option5: '5',
  flag: 'f',
  submit: 'Enter',
  next: 'Space',
  hint: 'h',
  calculator: 'c',
} as const;

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS = [
  { id: 'first-sprint', name: 'First Sprint', description: 'Complete your first sprint', icon: 'Zap', category: 'special' as const, requirement: 1, xpReward: 50 },
  { id: 'first-day', name: 'First Day', description: 'Complete your first full day', icon: 'Sun', category: 'special' as const, requirement: 1, xpReward: 100 },
  { id: 'streak-3', name: '3-Day Streak', description: 'Maintain a 3-day streak', icon: 'Flame', category: 'streak' as const, requirement: 3, xpReward: 75 },
  { id: 'streak-7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'Flame', category: 'streak' as const, requirement: 7, xpReward: 200 },
  { id: 'streak-14', name: 'Two Week Champion', description: '14-day streak', icon: 'Flame', category: 'streak' as const, requirement: 14, xpReward: 500 },
  { id: 'streak-30', name: 'Unstoppable', description: 'Complete the entire 30-day challenge', icon: 'Trophy', category: 'streak' as const, requirement: 30, xpReward: 2000 },
  { id: 'perfect-sprint', name: 'Perfect Sprint', description: 'Score 10/10 in a sprint', icon: 'Star', category: 'accuracy' as const, requirement: 1, xpReward: 100 },
  { id: 'perfect-day', name: 'Perfect Day', description: 'Score 50/50 in a day', icon: 'Crown', category: 'accuracy' as const, requirement: 1, xpReward: 500 },
  { id: 'correct-100', name: 'Century', description: 'Answer 100 questions correctly', icon: 'Target', category: 'volume' as const, requirement: 100, xpReward: 200 },
  { id: 'correct-500', name: 'Half Millennium', description: 'Answer 500 questions correctly', icon: 'Award', category: 'volume' as const, requirement: 500, xpReward: 500 },
  { id: 'correct-1000', name: 'Grand Master', description: 'Answer 1000 questions correctly', icon: 'Medal', category: 'volume' as const, requirement: 1000, xpReward: 1000 },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Complete 5 sprints under 10 minutes each', icon: 'Timer', category: 'speed' as const, requirement: 5, xpReward: 300 },
  { id: 'interview-ready', name: 'Interview Ready', description: 'Reach 80% overall accuracy', icon: 'Briefcase', category: 'accuracy' as const, requirement: 80, xpReward: 1000 },
] as const;

// Day-topic mapping (which topics are covered each day)
export const DAY_TOPICS: Record<number, { topics: string[]; title: string; description: string }> = {
  1: { topics: ['Percentages', 'Profit & Loss', 'Blood Relations', 'Graph Traversal'], title: 'Foundations', description: 'Percentages, P&L, Blood Relations, Graph Logic' },
  2: { topics: ['SI & CI', 'Ratio & Proportion', 'Seating Arrangement', 'Complexity Analysis'], title: 'Core Arithmetic', description: 'Interest, Ratios, Seating, Complexity' },
  3: { topics: ['Time & Work', 'Pipes & Cisterns', 'Puzzles', 'Binary Search Logic'], title: 'Work & Logic', description: 'Time-Work, Pipes, Puzzles, Binary Search' },
  4: { topics: ['Speed Distance Time', 'Boats & Streams', 'Coding Decoding', 'Tree Logic'], title: 'Motion & Trees', description: 'Speed, Boats, Coding-Decoding, Trees' },
  5: { topics: ['Averages', 'Mixtures & Alligation', 'Syllogism', 'Hash Maps'], title: 'Averages & Logic', description: 'Averages, Mixtures, Syllogism, Hash Maps' },
  6: { topics: ['Algebra', 'Number Systems', 'Data Sufficiency', 'SQL Reasoning'], title: 'Algebra & Data', description: 'Algebra, Numbers, Data Sufficiency, SQL' },
  7: { topics: ['Percentages', 'Profit & Loss', 'Seating Arrangement', 'Complexity Analysis'], title: 'Week 1 Review', description: 'Revision of Week 1 Topics' },
  8: { topics: ['Geometry', 'Mensuration', 'Direction Sense', 'Dynamic Arrays'], title: 'Geometry Day', description: 'Geometry, Mensuration, Directions, Arrays' },
  9: { topics: ['LCM & HCF', 'Divisibility', 'Clocks', 'Calendars'], title: 'Numbers & Time', description: 'LCM/HCF, Divisibility, Clocks, Calendars' },
  10: { topics: ['Permutations & Combinations', 'Probability', 'Cubes & Dice', 'ML Matrix Shapes'], title: 'Counting & Probability', description: 'P&C, Probability, Cubes, ML Matrices' },
  11: { topics: ['Progressions', 'Logarithms', 'Ranking & Order', 'Database Normalization'], title: 'Series & DB', description: 'AP/GP, Logarithms, Ranking, Normalization' },
  12: { topics: ['Time & Work', 'Pipes & Cisterns', 'Blood Relations', 'Prefix Sum & Sliding Window'], title: 'Work & Windows', description: 'Work, Pipes, Relations, Sliding Window' },
  13: { topics: ['SI & CI', 'Ratio & Proportion', 'Statement & Assumption', 'Memory Optimization'], title: 'Finance & Logic', description: 'Interest, Ratios, Assumptions, Memory' },
  14: { topics: ['Percentages', 'Profit & Loss', 'Data Interpretation', 'Graph Traversal'], title: 'Week 2 Review', description: 'Revision + Data Interpretation' },
  15: { topics: ['Speed Distance Time', 'Boats & Streams', 'Puzzles', 'Binary Search Logic'], title: 'Mid-Challenge', description: 'Motion, Puzzles, Binary Search (Advanced)' },
  16: { topics: ['Algebra', 'Number Systems', 'Syllogism', 'Tree Logic'], title: 'Algebra Deep Dive', description: 'Advanced Algebra, Syllogism, Trees' },
  17: { topics: ['Geometry', 'Mensuration', 'Seating Arrangement', 'Hash Maps'], title: 'Spatial Reasoning', description: 'Advanced Geometry, Seating, Hashing' },
  18: { topics: ['Permutations & Combinations', 'Probability', 'Coding Decoding', 'SQL Reasoning'], title: 'Probability & SQL', description: 'Advanced P&C, Coding, SQL' },
  19: { topics: ['Averages', 'Mixtures & Alligation', 'Statement & Conclusion', 'Complexity Analysis'], title: 'Weighted Logic', description: 'Mixtures, Conclusions, Big-O' },
  20: { topics: ['LCM & HCF', 'Divisibility', 'Data Sufficiency', 'Dynamic Arrays'], title: 'Number Theory', description: 'Advanced Number Theory, DS, Arrays' },
  21: { topics: ['Progressions', 'Modern Math', 'Direction Sense', 'ML Matrix Shapes'], title: 'Week 3 Review', description: 'Week 3 Revision + Modern Math' },
  22: { topics: ['Percentages', 'SI & CI', 'Blood Relations', 'Database Normalization'], title: 'Company Sim 1', description: 'Amazon/Google Style Questions' },
  23: { topics: ['Time & Work', 'Speed Distance Time', 'Puzzles', 'Graph Traversal'], title: 'Company Sim 2', description: 'Microsoft/Goldman Style Questions' },
  24: { topics: ['Algebra', 'Probability', 'Seating Arrangement', 'Binary Search Logic'], title: 'Company Sim 3', description: 'JP Morgan/Adobe Style Questions' },
  25: { topics: ['Geometry', 'Mensuration', 'Data Interpretation', 'SQL Reasoning'], title: 'Company Sim 4', description: 'Flipkart/Walmart Style Questions' },
  26: { topics: ['Profit & Loss', 'Ratio & Proportion', 'Syllogism', 'Hash Maps'], title: 'Mock Test 1', description: 'Full Mixed Mock (Easy-Medium)' },
  27: { topics: ['Permutations & Combinations', 'Logarithms', 'Statement & Assumption', 'Tree Logic'], title: 'Mock Test 2', description: 'Full Mixed Mock (Medium)' },
  28: { topics: ['Number Systems', 'Progressions', 'Cubes & Dice', 'Complexity Analysis'], title: 'Mock Test 3', description: 'Full Mixed Mock (Medium-Hard)' },
  29: { topics: ['Mixtures & Alligation', 'Probability', 'Data Interpretation', 'Memory Optimization'], title: 'Final Mock', description: 'Full Mixed Mock (Hard)' },
  30: { topics: ['Modern Math', 'Data Sufficiency', 'Coding Decoding', 'ML Matrix Shapes'], title: 'Grand Finale', description: 'Ultimate Challenge — All Topics' },
};
