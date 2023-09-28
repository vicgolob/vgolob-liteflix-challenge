export interface MovieData {
  id: number;
  backdrop_path: string;
  title: string;
  vote_average?: number;
  release_date?: string;
}

export interface FetchMoviesResponse {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface SidePanelContextProps {
  sidePanelIsOpen: boolean;
  toggleSidePanelIsOpen: Function;
}

export interface SidePanelRefType {
  forceClosePanel: () => void;
}

export interface DropdownMenuOption {
  label: string;
  value: string;
}
