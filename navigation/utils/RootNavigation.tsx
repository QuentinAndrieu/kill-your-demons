// RootNavigation.js

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name: string, params: {}): any {
  console.log('navigationRef.current', navigationRef.current);
  navigationRef.current?.navigate(name, params);
}
