export interface HeaderProps {
  name: string;
}
export interface TotalProps {
  numberOfExercises: number;
}

interface CoursePartBase {
  id: number;
  name: string;
  exerciseCount: number;
}
interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDesc {
  requirements: Array<string>;
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export interface ContentProps {
  content: Array<CoursePart>;
}

export interface PartProps {
  part: CoursePart;
}
