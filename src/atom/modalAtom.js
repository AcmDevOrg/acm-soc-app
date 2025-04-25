import { atom } from "recoil";
import React from 'react';

export const modalAtom = atom( {
    key: 'modalState',
    default: false,
});
export const postIdAtom = atom({
    key: 'postIdState',
    default: '',
});