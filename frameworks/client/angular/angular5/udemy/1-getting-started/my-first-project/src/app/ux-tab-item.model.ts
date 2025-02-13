// tom:
// 1. use interface instead of class
// 2. remove props which are NOT needed for displaying the actual tabs component
// 3. all props except Label are optional!

export interface UxTabItem {
    // id: string;
    // index: number;
    label: string;
    subLabel?: string;
    iconClass?: string;
    iconTypeClass?: string;
    isClosable?: boolean; // false
    isDisabled?: boolean; // false
    tag?: string;
    tagTypeClass?: string;
    hasMarker?: boolean;
    markerTypeClass?: string;
    isActive?: boolean; // false
    // isVisible: boolean; // true
    // url: string;
    // isVisibleOnScreen: boolean; // true

}

// utility interface
// export interface UrlUxTabBarItem extends UxTabItem {
//     url: string;
// }
