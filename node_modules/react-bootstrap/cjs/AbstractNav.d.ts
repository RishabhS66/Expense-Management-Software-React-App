import * as React from 'react';
import { BsPrefixRefForwardingComponent, SelectCallback } from './helpers';
import { EventKey } from './types';
interface AbstractNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    activeKey?: EventKey;
    as?: React.ElementType;
    onSelect?: SelectCallback;
    parentOnSelect?: SelectCallback;
}
declare const AbstractNav: BsPrefixRefForwardingComponent<'ul', AbstractNavProps>;
export default AbstractNav;
