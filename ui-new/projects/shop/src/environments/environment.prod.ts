import { environment as env } from 'shared/environments/environment.prod';

const shopName = document.querySelector("meta[name=shop-name]");
const shopKey = document.querySelector("meta[name=shop-key]");
const themeColor = document.querySelector("meta[name=theme-color]");


export const environment = { ...env, ...{
    siteName: shopName?.getAttribute("content"),
    shopKey: shopKey?.getAttribute("content"),
    themeColor: themeColor?.getAttribute("content"),
    demoShopKey: '3d9f5a8eec71764c7c2df5a56496c8a1320dd921',
    vapidKey:'BKpLN2XozGCAWv8sxX98M0xH9E7Hpqm-xp3OFgvUPWfVlv4KFmxR00u4uQd-Skt9pxinhOV9kbnvHqqdb4fFp5Y'
}};
