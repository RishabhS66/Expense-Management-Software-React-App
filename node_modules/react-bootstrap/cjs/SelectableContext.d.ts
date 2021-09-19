import * as React from 'react';
import { SelectCallback } from './helpers';
declare const SelectableContext: React.Context<SelectCallback | null>;
export declare const makeEventKey: (eventKey?: string | number | null | undefined, href?: string | null) => string | null;
export default SelectableContext;
