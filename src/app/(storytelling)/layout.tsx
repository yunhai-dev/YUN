import { NoomoExperienceShell } from '@/components/noomo/NoomoExperienceShell';

// Only the storytelling routes mount the GSAP/ScrollSmoother shell and its CSS, keeping
// that cost out of blog/docs/tools page bundles.
export default function StorytellingLayout({ children }: { children: React.ReactNode }) {
  return <NoomoExperienceShell>{children}</NoomoExperienceShell>;
}
