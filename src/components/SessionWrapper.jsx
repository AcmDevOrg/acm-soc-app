'use client'
import React from 'react';
import { RecoilRoot } from 'recoil';

export default function SessionWrapper({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
