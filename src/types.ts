export interface Project {
  id: string;
  title: string;
  location: string;
  scope: string;
  image: string;
  description: string;
}

export interface MoodResponse {
  name: string;
  palette: { hex: string; material: string }[];
  principles: string[];
  direction: string;
}

export interface NavLink {
  label: string;
  href: string;
}
