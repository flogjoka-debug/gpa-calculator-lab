# UC and LSAC policy brief

Saved in phase 4 (2026-11-22). Source of truth for src/lib/calc/uc.ts and src/lib/calc/lsac.ts.

UC — source: https://admission.universityofcalifornia.edu/admission-requirements/first-year-requirements/gpa-requirement.html (checked 2026-11-22)
- Only A-G courses count, from the summer after 9th grade through the summer after 11th grade.
- Grade points: A = 4, B = 3, C = 2, D = 1. Pluses and minuses don't count. The page lists no value for F; count F as 0 points with its semester included, and show the note "UC's page lists values for A to D only. We count an F as 0 points."
- Each semester grade is one grade. A college course counts as one grade and one honors point.
- Summer after 9th or 10th grade counts as 10th grade. Summer after 11th grade counts as 11th grade.
- Honors points: one extra point per semester of a UC-approved honors course with a grade of A, B or C (no point for D or F). At most 8 honors points in total, and at most 4 of them from 10th grade.
- California residents: AP, IB Higher Level, designated IB Standard Level, UC-transferable college courses and UC-certified honors courses on the school's course list can earn honors points.
- Nonresidents: only AP and IB courses earn honors points, and only with an A, B or C. School-designated honors courses don't.
- Divide total grade points by the number of semester grades. Do not round up or down: display by truncating to two decimals (56 ÷ 12 = 4.666… → 4.66).
- Minimum GPA: 3.0 for California residents, 3.4 for nonresidents.
- The page does not describe repeated courses or an uncapped GPA, so the calculator does neither. A repeated class gets the warning "Repeated class: check how UC treats it before relying on this result."

LSAC — sources: https://www.lsac.org/applying-law-school/jd-application-process/cas/requesting/transcript-summarization and https://www.lsac.org/blog/providing-more-time-adjust-lsac-gpa-changes (announced 2026-08-18; both checked 2026-11-22)
- Conversion: A+ 4.33, A 4.00, A− 3.67, AB 3.50, B+ 3.33, B 3.00, B− 2.67, BC 2.50, C+ 2.33, C 2.00, C− 1.67, CD 1.50, D+ 1.33, D 1.00, D− 0.67, DE or DF 0.50, E and F 0.00.
- Counted: every graded course up to the date of the first bachelor's degree. Repeated courses count every attempt shown with a grade and credits. Failing grades count as 0.00, including NP/No Pass and a WF the school treats as punitive.
- Not counted: W and incompletes the school treats as nonpunitive, a WF the school treats as nonpunitive, passing grades in pass/fail systems, remedial courses marked remedial, noncredit courses, AP test credit, and anything after the first bachelor's degree.
- Credits are reported in semester hours. Quarter hours × 0.67 = semester hours.
- College courses taken while in high school (dual enrollment): 2026–2027 cycle → included; 2027–2028 cycle and later → excluded, for all applicants including reapplicants.
- The application cycle has no default. The student picks it before a result appears.

