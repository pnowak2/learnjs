import { UxTabItem } from './ux-tab-item.model';

export class UxTab implements UxTabItem {
    id: string;
    index: number;
    label: string;
    subLabel: string;
    iconClass: string;
    iconTypeClass: string;
    isClosable: boolean = false;
    isDisabled: boolean = false;
    tag: string;
    tagTypeClass: string;
    hasMarker: boolean;
    markerTypeClass: string;
    isActive: boolean = false;
    isVisible: boolean = true;
    url: string;
    isVisibleOnScreen: boolean = true;
    hasValidationErrors: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
