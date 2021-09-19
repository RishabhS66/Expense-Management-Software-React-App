import * as React from 'react';
import { AsProp, BsPrefixRefForwardingComponent } from './helpers';
export interface FeedbackProps extends AsProp, React.HTMLAttributes<HTMLElement> {
    bsPrefix?: never;
    type?: 'valid' | 'invalid';
    tooltip?: boolean;
}
declare const Feedback: BsPrefixRefForwardingComponent<'div', FeedbackProps>;
export default Feedback;
