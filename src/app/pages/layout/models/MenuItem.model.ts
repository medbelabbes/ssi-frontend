export declare class MenuItem {

  /**
   * Item Title
   */
  id: number;

  /**
   * Item Title
   */
  title: string;
  /**
   * Item relative link (for routerLink)
   */
  link?: string;
  /**
   * Item URL (absolute)
   */
  url?: string;
  /**
   * Icon class name or icon config object
   */
  icon?: string;
  iconType?: string;
  /**
   * Expanded by default
   */
  expanded?: boolean;
  /**
   * Children items
   */
  children?: MenuItem[];
  /**
   * HTML Link target
   */
  target?: string;
  /**
   * Hidden Item
   */
  hidden?: boolean;

  /**
   * The current page
   */
  currentPage?: number;
  /**
   * Item is selected when partly or fully equal to the current url
   */
  pathMatch?: 'full' | 'prefix';
  /**
   * Where this is a home item
   */
  home?: boolean;
  /**
   * Whether the item is just a group (non-clickable)
   */
  group?: boolean;
  /** Whether the item skipLocationChange is true or false
   */
  skipLocationChange?: boolean;
  /** Map of query parameters
   */
  queryParams?: any;
  parent?: MenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;

}
