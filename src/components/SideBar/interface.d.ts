export interface ISideBarProps {
  retracted: boolean;
  setRetracted: (isRetracted: boolean) => void;
  userData: Record<string, unknown>;
}
