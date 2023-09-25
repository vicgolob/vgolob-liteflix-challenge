export interface IMovie {
  backdrop_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export interface SidePanelContextProps {
  sidePanelIsOpen: boolean;
  toggleSidePanelIsOpen: Function;
  sidePanelIsMobile: boolean;
  setSidePanelIsMobile: Function;
}

export interface SidePanelRefType {
  forceClosePanel: () => void;
}
