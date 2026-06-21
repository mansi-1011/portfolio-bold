import type { LucideIcon } from "lucide-react"
import {
  ArrowRight,
  ArrowUp,
  Box,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Check,
  Clock,
  Cloud,
  Code2,
  Cog,
  Database,
  FlaskConical,
  FolderKanban,
  GitBranch,
  Globe,
  Hammer,
  Hexagon,
  Layers,
  LifeBuoy,
  Link2,
  Lock,
  Mail,
  Menu,
  Monitor,
  Rocket,
  Search,
  Settings,
  Shield,
  Sparkles,
  Star,
  Sun,
  TestTube,
  X,
  Zap,
} from "lucide-react"

/** Brand stand-ins (Lucide removed social brand icons) */
export const Github = GitBranch
export const Linkedin = Link2

export const statIcons = [Clock, FolderKanban, Layers, Cloud] as const

export const serviceIcons = [Monitor, Settings, Database, Cloud, Lock, Zap] as const

export const workflowIcons = [Search, ClipboardList, Hammer, TestTube, Rocket, LifeBuoy] as const

export const achievementIcons = [Zap, Sparkles, Shield, Globe] as const

export const skillCategoryIcons: Record<string, LucideIcon> = {
  Frontend: Hexagon,
  Backend: Cog,
  Database: Database,
  Languages: Code2,
  "Cloud & DevOps": Cloud,
  "Testing & Tools": FlaskConical,
}

export {
  ArrowRight,
  ArrowUp,
  Box,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Mail,
  Menu,
  Sparkles,
  Star,
  Sun,
  X,
}

export const ICON_SIZE = 18
export const ICON_SIZE_SM = 16
export const ICON_SIZE_LG = 22
