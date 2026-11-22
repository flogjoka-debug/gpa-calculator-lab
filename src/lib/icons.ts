import {
  Award, BookOpen, CalendarRange, Calculator, ClipboardCheck, FlaskConical, GraduationCap, Landmark, Layers,
  ListChecks, Mail, Percent, Ruler, Scale, School, ShieldCheck, SlidersHorizontal, Target, TrendingUp, Users,
  type LucideIcon,
} from "lucide-react";

/** One icon per public page, used in navigation, eyebrows and link cards. */
export const PAGE_ICONS: Record<string, LucideIcon> = {
  "/": Calculator,
  "/college-gpa-calculator/": GraduationCap,
  "/high-school-gpa-calculator/": School,
  "/cumulative-gpa-calculator/": Layers,
  "/grade-calculator/": ClipboardCheck,
  "/final-grade-calculator/": Target,
  "/semester-grade-calculator/": CalendarRange,
  "/percentage-to-letter-grade/": Percent,
  "/uc-gpa-calculator/": Landmark,
  "/law-school-gpa-calculator/": Scale,
  "/guides/": BookOpen,
  "/guides/what-is-a-good-gpa/": Award,
  "/guides/weighted-vs-unweighted-gpa/": SlidersHorizontal,
  "/guides/gpa-scale/": Ruler,
  "/guides/how-to-raise-your-gpa/": TrendingUp,
  "/about/": Users,
  "/methodology/": FlaskConical,
  "/privacy/": ShieldCheck,
  "/contact/": Mail,
};

export const GROUP_ICONS = { gpa: GraduationCap, grade: ListChecks, admissions: Landmark, guides: BookOpen, how: FlaskConical } satisfies Record<string, LucideIcon>;

export const iconFor = (path: string): LucideIcon => PAGE_ICONS[path] ?? Calculator;

/** Short label shown in the eyebrow above each page's H1, taken from its navigation group. */
export function eyebrowFor(path: string): { label: string; icon: LucideIcon } {
  if (path.startsWith("/guides/")) return { label: path === "/guides/" ? "Guides" : "GPA guide", icon: GROUP_ICONS.guides };
  if (["/", "/college-gpa-calculator/", "/high-school-gpa-calculator/", "/cumulative-gpa-calculator/"].includes(path)) return { label: "GPA calculator", icon: GROUP_ICONS.gpa };
  if (["/grade-calculator/", "/final-grade-calculator/", "/semester-grade-calculator/", "/percentage-to-letter-grade/"].includes(path)) return { label: "Grade calculator", icon: GROUP_ICONS.grade };
  if (["/uc-gpa-calculator/", "/law-school-gpa-calculator/"].includes(path)) return { label: "Admissions", icon: GROUP_ICONS.admissions };
  return { label: "GPA Calculator Lab", icon: iconFor(path) };
}
