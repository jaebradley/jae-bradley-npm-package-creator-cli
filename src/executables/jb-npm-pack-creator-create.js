#!/usr/bin/env node

/* eslint-disable no-console */

import createPackage from '../createPackage';

const execute = async () => {
  try {
    await createPackage();
  } catch (e) {
    console.error('😞  Rut ro, an error occurred');
    console.error(e);
  }
};

execute();
