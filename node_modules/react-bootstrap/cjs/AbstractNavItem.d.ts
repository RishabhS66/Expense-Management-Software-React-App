import * as React from 'react';
import { BsPrefixRefForwardingComponent } from './helpers';
import { EventKey } from './types';
export interface AbstractNavItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    active?: boolean;
    as: React.ElementType;
    disabled?: boolean;
    eventKey?: EventKey;
    href?: string;
    tabIndex?: number;
    onSelect?: (navKey: string, e: any) => void;
}
declare const AbstractNavItem: BsPrefixRefForwardingComponent<'div', AbstractNavItemProps>;
export default AbstractNavItem;
